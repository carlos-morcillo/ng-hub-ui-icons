import { HubIconRenderSpec } from './icon-render-spec';

/**
 * An icon pack: a pure resolver that maps an icon `name` (and optional
 * `variant`) to a {@link HubIconRenderSpec}. A pack only encodes an icon set's
 * naming convention — it never bundles the set's fonts/CSS/SVGs, so the library
 * stays dependency-free. The host application loads the actual icon assets.
 */
export interface HubIconPack {
	/**
	 * Resolves an icon to a render spec.
	 *
	 * @param name - The icon name (without the pack's own prefix, although a
	 *   fully-qualified name is also accepted by the built-in presets).
	 * @param variant - The requested variant; when omitted the pack's
	 *   {@link HubIconPack.defaultVariant} applies.
	 * @returns The render instruction for this icon.
	 */
	resolve(name: string, variant?: string): HubIconRenderSpec;

	/** Variant used when a call site does not specify one. */
	readonly defaultVariant?: string;

	/**
	 * Optional bridge that maps hub icon tokens to the set's own CSS custom
	 * properties. Applied as inline custom properties on the host element, so a
	 * set that themes via its own variables still follows `--hub-icon-*`.
	 */
	readonly cssVars?: Readonly<Record<string, string>>;
}
