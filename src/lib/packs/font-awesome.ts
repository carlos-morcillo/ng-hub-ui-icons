import { HubIconPack } from '../models/icon-pack';
import { classPack } from './class-pack';

/** Font Awesome 6 style families. */
export type FaVariant = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';

/** Maps a Font Awesome variant to its style class. */
const FA_VARIANT_CLASS: Record<FaVariant, string> = {
	solid: 'fa-solid',
	regular: 'fa-regular',
	light: 'fa-light',
	thin: 'fa-thin',
	duotone: 'fa-duotone',
	brands: 'fa-brands'
};

/** Options for {@link faPack}. */
export interface FaPackOptions {
	/** Style family used when a call site omits a variant. Defaults to `solid`. */
	defaultVariant?: FaVariant;
}

/**
 * Font Awesome 6 pack. Produces `fa-<variant> fa-<name>` (e.g. `fa-solid
 * fa-house`). The Font Awesome CSS/webfont must be loaded by the host app — this
 * pack only formats the class names.
 *
 * @param options - Optional default variant.
 * @returns A {@link HubIconPack}.
 *
 * @example
 * ```ts
 * provideHubIcons({ defaultPack: 'fa', packs: { fa: faPack({ defaultVariant: 'regular' }) } });
 * // <hub-icon name="house" />            → fa-regular fa-house
 * // <hub-icon name="github" variant="brands" /> → fa-brands fa-github
 * ```
 */
export function faPack(options: FaPackOptions = {}): HubIconPack {
	const defaultVariant: FaVariant = options.defaultVariant ?? 'solid';

	return classPack({
		defaultVariant,
		template: (name, variant) => {
			const style = FA_VARIANT_CLASS[(variant as FaVariant) ?? defaultVariant] ?? FA_VARIANT_CLASS[defaultVariant];
			const icon = name.startsWith('fa-') ? name : `fa-${name}`;
			return `${style} ${icon}`;
		}
	});
}
