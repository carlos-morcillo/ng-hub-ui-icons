import { inject, Injectable } from '@angular/core';
import { HubIconPack } from '../models/icon-pack';
import { HubIconRenderSpec } from '../models/icon-render-spec';
import { HUB_ICONS_CONFIG } from './icons-config';

/** Parsed icon reference after expanding the `pack:variant:name` shorthand. */
interface ResolvedRef {
	pack?: string;
	variant?: string;
	name: string;
}

/**
 * Resolves icon references to {@link HubIconRenderSpec}s using the packs
 * registered via `provideHubIcons()`. Supports the `pack:variant:name`
 * (or `pack:name`) shorthand in the `name`, with explicit `pack` / `variant`
 * inputs taking precedence.
 */
@Injectable({ providedIn: 'root' })
export class HubIconRegistry {
	readonly #config = inject(HUB_ICONS_CONFIG);

	/**
	 * Resolves an icon to its render spec.
	 *
	 * @param name - Icon name, optionally in `pack:variant:name` / `pack:name` form.
	 * @param pack - Explicit pack key (overrides a shorthand pack and `defaultPack`).
	 * @param variant - Explicit variant (overrides a shorthand variant and the pack default).
	 * @returns The render spec for the icon.
	 * @throws If no pack can be determined or the pack key is unknown.
	 */
	resolve(name: string, pack?: string, variant?: string): HubIconRenderSpec {
		const ref = this.#parse(name, pack, variant);
		return this.#pack(ref.pack).resolve(ref.name, ref.variant);
	}

	/**
	 * Returns the `cssVars` bridge of the pack that would handle the given key
	 * (or the default pack), if any.
	 *
	 * @param pack - Explicit pack key; falls back to `defaultPack`.
	 * @returns The pack's CSS-variable bridge, or `undefined`.
	 */
	cssVars(pack?: string): Readonly<Record<string, string>> | undefined {
		const key = pack ?? this.#config.defaultPack;
		return key ? this.#config.packs[key]?.cssVars : undefined;
	}

	/**
	 * Expands the `pack:variant:name` / `pack:name` shorthand, honouring explicit
	 * `pack` / `variant` arguments over the shorthand parts.
	 */
	#parse(name: string, pack?: string, variant?: string): ResolvedRef {
		if (name.includes(':')) {
			const parts = name.split(':');
			if (parts.length >= 3) {
				return { pack: pack ?? parts[0], variant: variant ?? parts[1], name: parts.slice(2).join(':') };
			}
			if (parts.length === 2) {
				return { pack: pack ?? parts[0], variant, name: parts[1] };
			}
		}
		return { pack, variant, name };
	}

	/** Looks up a pack by key (or the default), with actionable errors. */
	#pack(pack?: string): HubIconPack {
		const key = pack ?? this.#config.defaultPack;

		if (!key) {
			throw new Error(
				'[ng-hub-ui-icons] No icon pack specified and no `defaultPack` configured. ' +
					'Set `defaultPack` in provideHubIcons() or pass a [pack].'
			);
		}

		const resolved = this.#config.packs[key];

		if (!resolved) {
			const registered = Object.keys(this.#config.packs).join(', ') || '(none)';
			throw new Error(`[ng-hub-ui-icons] Unknown icon pack "${key}". Registered packs: ${registered}.`);
		}

		return resolved;
	}
}
