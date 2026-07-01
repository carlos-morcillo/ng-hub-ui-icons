import { HubIconPack } from '../models/icon-pack';
import { ligaturePack } from './ligature-pack';

/** Material Symbols families. */
export type MaterialSymbolsVariant = 'outlined' | 'rounded' | 'sharp';

/** Options for {@link materialSymbolsPack}. */
export interface MaterialSymbolsPackOptions {
	/** Symbols family used when a call site omits a variant. Defaults to `outlined`. */
	variant?: MaterialSymbolsVariant;
}

/**
 * Material Symbols pack (ligature-based: the icon name is the element's text).
 * Produces the class `material-symbols-<variant>` and renders the name as the
 * glyph. The variable-font axes are driven by the `--hub-icon-fill` /
 * `--hub-icon-weight` / `--hub-icon-grade` / `--hub-icon-optical-size` tokens via
 * the library stylesheet (mapped to `font-variation-settings`). The Material
 * Symbols font must be loaded by the host app.
 *
 * @param options - Optional default family.
 * @returns A {@link HubIconPack}.
 *
 * @example
 * ```ts
 * provideHubIcons({ defaultPack: 'ms', packs: { ms: materialSymbolsPack({ variant: 'rounded' }) } });
 * // <hub-icon name="home" pack="ms" /> → <i class="material-symbols-rounded">home</i>
 * ```
 */
export function materialSymbolsPack(options: MaterialSymbolsPackOptions = {}): HubIconPack {
	const defaultVariant: MaterialSymbolsVariant = options.variant ?? 'outlined';

	return ligaturePack({
		defaultVariant,
		baseClass: (variant) => `material-symbols-${(variant as MaterialSymbolsVariant) ?? defaultVariant}`
	});
}
