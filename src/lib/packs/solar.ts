import { HubIconPack } from '../models/icon-pack';
import { classPack } from './class-pack';

/** Solar icon styles. */
export type SolarVariant = 'linear' | 'bold' | 'broken' | 'outline' | 'lineduotone' | 'boldduotone';

/** Options for {@link solarPack}. */
export interface SolarPackOptions {
	/** Solar style used when a call site omits a variant. Defaults to `linear`. */
	variant?: SolarVariant;
	/**
	 * Class template override. Solar is distributed in several ways (webfont,
	 * Iconify CSS, SVG); set this to match yours. Receives the name and the
	 * resolved variant. Defaults to `solar-<variant> solar-<name>`.
	 */
	template?: (name: string, variant?: string) => string;
}

/**
 * Solar pack. By default produces a two-class string `solar-<variant>
 * solar-<name>` (e.g. `solar-bold solar-home`). Solar has no single universal
 * class convention, so pass {@link SolarPackOptions.template} to adapt it to
 * your distribution (or use {@link svgPack} for the SVG build). The Solar assets
 * must be loaded by the host app.
 *
 * @param options - Optional default variant and class template.
 * @returns A {@link HubIconPack}.
 *
 * @example
 * ```ts
 * provideHubIcons({ defaultPack: 'solar', packs: { solar: solarPack({ variant: 'bold' }) } });
 * // <hub-icon name="home" pack="solar" /> → solar-bold solar-home
 * ```
 */
export function solarPack(options: SolarPackOptions = {}): HubIconPack {
	const defaultVariant: SolarVariant = options.variant ?? 'linear';
	const template =
		options.template ??
		((name: string, variant?: string) => {
			const style = (variant as SolarVariant) ?? defaultVariant;
			const icon = name.startsWith('solar-') ? name : `solar-${name}`;
			return `solar-${style} ${icon}`;
		});

	return classPack({ defaultVariant, template });
}
