import { HubIconPack } from '../models/icon-pack';
import { classPack } from './class-pack';

/**
 * Bootstrap Icons pack. Produces `bi bi-<name>` (e.g. `bi bi-house`). Bootstrap
 * Icons has no style families; filled variants are distinct names ending in
 * `-fill` (pass them as the name, e.g. `house-fill`). The Bootstrap Icons CSS
 * must be loaded by the host app.
 *
 * @returns A {@link HubIconPack}.
 *
 * @example
 * ```ts
 * provideHubIcons({ defaultPack: 'bi', packs: { bi: bootstrapPack() } });
 * // <hub-icon name="house" pack="bi" />      → bi bi-house
 * // <hub-icon name="house-fill" pack="bi" /> → bi bi-house-fill
 * ```
 */
export function bootstrapPack(): HubIconPack {
	return classPack({
		template: (name) => {
			const icon = name.startsWith('bi-') ? name : `bi-${name}`;
			return `bi ${icon}`;
		}
	});
}
