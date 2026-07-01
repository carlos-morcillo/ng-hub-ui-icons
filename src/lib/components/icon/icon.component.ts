import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	ElementRef,
	inject,
	input,
	ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
	HubIconClassesSpec,
	HubIconImgSpec,
	HubIconRenderSpec,
	HubIconSvgSpec,
	HubIconUseSpec
} from '../../models/icon-render-spec';
import { HubIconRegistry } from '../../services/icon-registry.service';

/**
 * Renders an icon from any registered pack — Font Awesome, Bootstrap Icons,
 * Material Symbols, Solar or your own SVGs — through one agnostic API.
 *
 * The pack is chosen by `pack` (or the configured `defaultPack`); the name may
 * also use the `pack:variant:name` shorthand. Size and color come from the
 * `--hub-icon-*` tokens, overridable per instance with `size` / `color`.
 *
 * @example
 * ```html
 * <hub-icon name="house" />
 * <hub-icon name="house" pack="bi" />
 * <hub-icon name="home" pack="ms" variant="rounded" size="2rem" />
 * <hub-icon name="fa:brands:github" label="GitHub" />
 * ```
 */
@Component({
	selector: 'hub-icon',
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'hub-icon',
		'[class.hub-icon--spin]': 'spin()',
		'[style.--hub-icon-size]': 'size() || null',
		'[style.--hub-icon-color]': 'color() || null',
		'[attr.role]': 'label() ? "img" : null',
		'[attr.aria-label]': 'label() || null',
		'[attr.aria-hidden]': 'label() ? null : "true"'
	}
})
export class HubIconComponent {
	readonly #registry = inject(HubIconRegistry);
	readonly #sanitizer = inject(DomSanitizer);
	readonly #host = inject(ElementRef<HTMLElement>);

	/** Icon name. Accepts the `pack:variant:name` / `pack:name` shorthand. */
	readonly name = input.required<string>();

	/** Pack key. Overrides a shorthand pack and the configured `defaultPack`. */
	readonly pack = input<string>();

	/** Variant. Overrides a shorthand variant and the pack default. */
	readonly variant = input<string>();

	/** Per-instance size, written to `--hub-icon-size` (e.g. `1.5rem`, `24px`). */
	readonly size = input<string>();

	/** Per-instance color, written to `--hub-icon-color`. */
	readonly color = input<string>();

	/**
	 * Accessible label. When set, the host is exposed as `role="img"` with this
	 * `aria-label`; when omitted the icon is decorative (`aria-hidden="true"`).
	 */
	readonly label = input<string>();

	/** Continuously rotates the icon (e.g. for loaders). */
	readonly spin = input(false, { transform: booleanAttribute });

	/** Resolved render spec; fails soft to an empty glyph and logs on error. */
	protected readonly spec = computed<HubIconRenderSpec>(() => {
		try {
			return this.#registry.resolve(this.name(), this.pack(), this.variant());
		} catch (error) {
			console.error(error);
			return { kind: 'classes', classes: '' };
		}
	});

	/** Class string for the `classes` render kind. */
	protected readonly classes = computed(() =>
		this.spec().kind === 'classes' ? (this.spec() as HubIconClassesSpec).classes : ''
	);

	/** Ligature text for the `classes` render kind (Material Symbols et al.). */
	protected readonly text = computed(() =>
		this.spec().kind === 'classes' ? ((this.spec() as HubIconClassesSpec).text ?? '') : ''
	);

	/** Sanitized inline SVG for the `svg` render kind. */
	protected readonly safeSvg = computed<SafeHtml | ''>(() =>
		this.spec().kind === 'svg' ? this.#sanitizer.bypassSecurityTrustHtml((this.spec() as HubIconSvgSpec).svg) : ''
	);

	/** Sprite `href` for the `use` render kind. */
	protected readonly href = computed(() => (this.spec().kind === 'use' ? (this.spec() as HubIconUseSpec).href : ''));

	/** Image source for the `img` render kind. */
	protected readonly src = computed(() => (this.spec().kind === 'img' ? (this.spec() as HubIconImgSpec).src : ''));

	/** Image alt text for the `img` render kind. */
	protected readonly imgAlt = computed(() =>
		this.spec().kind === 'img' ? ((this.spec() as HubIconImgSpec).alt ?? '') : ''
	);

	constructor() {
		// Apply the active pack's optional CSS-variable bridge as inline custom
		// properties, so sets that theme through their own variables follow the
		// `--hub-icon-*` tokens.
		effect(() => {
			const vars = this.#registry.cssVars(this.pack());

			if (!vars) {
				return;
			}

			const el = this.#host.nativeElement;

			for (const [key, value] of Object.entries(vars)) {
				el.style.setProperty(key, value);
			}
		});
	}
}
