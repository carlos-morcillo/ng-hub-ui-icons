import { HubIconPack } from '../models/icon-pack';

/** Options for {@link ligaturePack}. */
export interface LigaturePackOptions {
	/**
	 * Base class for the glyph element — a fixed string, or a function of the
	 * resolved variant (e.g. `material-symbols-outlined`).
	 */
	baseClass: string | ((variant?: string) => string);
	/** Variant applied when a call site omits one. */
	defaultVariant?: string;
	/** Optional hub-token → set-variable bridge (see {@link HubIconPack.cssVars}). */
	cssVars?: Readonly<Record<string, string>>;
}

/**
 * Creates a ligature-based icon pack: the glyph is the element's **text
 * content** (the icon name), drawn by a ligature font such as Material Symbols.
 * The pack emits the base class and carries the name as the spec's `text`.
 *
 * @param options - The base class and optional defaults.
 * @returns A {@link HubIconPack}.
 */
export function ligaturePack(options: LigaturePackOptions): HubIconPack {
	return {
		defaultVariant: options.defaultVariant,
		cssVars: options.cssVars,
		resolve(name: string, variant?: string) {
			const resolved = variant ?? options.defaultVariant;
			const base = typeof options.baseClass === 'function' ? options.baseClass(resolved) : options.baseClass;
			return { kind: 'classes', classes: base, text: name };
		}
	};
}
