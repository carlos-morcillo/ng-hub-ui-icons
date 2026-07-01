/**
 * Class-based render: the icon is drawn by an external icon set's CSS classes
 * (e.g. Font Awesome `fa-solid fa-house`, Bootstrap `bi bi-house`). For ligature
 * sets (Material Symbols) the glyph is the element's text content, carried in
 * {@link HubIconClassesSpec.text}.
 */
export interface HubIconClassesSpec {
	readonly kind: 'classes';
	/** Space-separated CSS classes applied to the rendered glyph element. */
	readonly classes: string;
	/** Ligature text rendered inside the element (Material Symbols and similar). */
	readonly text?: string;
}

/** Inline-SVG render: raw `<svg>…</svg>` markup (sanitized before insertion). */
export interface HubIconSvgSpec {
	readonly kind: 'svg';
	/** Trusted SVG markup, provided by the pack/developer configuration. */
	readonly svg: string;
}

/** SVG-sprite render: an `<svg><use href="…"></use></svg>` reference. */
export interface HubIconUseSpec {
	readonly kind: 'use';
	/** The `href` of the sprite symbol, e.g. `assets/icons.svg#house`. */
	readonly href: string;
}

/** Image render: an `<img>` pointing at a standalone icon asset. */
export interface HubIconImgSpec {
	readonly kind: 'img';
	/** Image source URL. */
	readonly src: string;
	/** Alternative text (defaults to empty — the icon is usually decorative). */
	readonly alt?: string;
}

/**
 * The render instruction produced by a {@link HubIconPack} for a given icon
 * name (and optional variant). A discriminated union over the four ways an icon
 * set can be drawn, keeping `ng-hub-ui-icons` agnostic to any specific pack.
 */
export type HubIconRenderSpec = HubIconClassesSpec | HubIconSvgSpec | HubIconUseSpec | HubIconImgSpec;
