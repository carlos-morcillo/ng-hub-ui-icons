import { HubIconPack } from '../models/icon-pack';

/** Options for {@link classPack}. */
export interface ClassPackOptions {
	/**
	 * Builds the full space-separated class string for an icon. Receives the icon
	 * name and the resolved variant (already defaulted).
	 */
	template: (name: string, variant?: string) => string;
	/** Variant applied when a call site omits one. */
	defaultVariant?: string;
	/** Optional hub-token → set-variable bridge (see {@link HubIconPack.cssVars}). */
	cssVars?: Readonly<Record<string, string>>;
}

/**
 * Creates a class-based icon pack: the icon is rendered by an external set's CSS
 * classes (Font Awesome, Bootstrap Icons, etc.). The pack only formats class
 * names — it bundles nothing.
 *
 * @param options - The class template and optional defaults.
 * @returns A {@link HubIconPack}.
 *
 * @example
 * ```ts
 * const custom = classPack({ template: (name) => `myset myset-${name}` });
 * ```
 */
export function classPack(options: ClassPackOptions): HubIconPack {
	return {
		defaultVariant: options.defaultVariant,
		cssVars: options.cssVars,
		resolve(name: string, variant?: string) {
			return { kind: 'classes', classes: options.template(name, variant ?? options.defaultVariant) };
		}
	};
}
