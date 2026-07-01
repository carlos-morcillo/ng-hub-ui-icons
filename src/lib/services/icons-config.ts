import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { HubIconsConfig } from '../models/icons-config';

/** Default configuration: no packs registered, no default pack. */
export const defaultHubIconsConfig: HubIconsConfig = { packs: {} };

/**
 * Injection token holding the active {@link HubIconsConfig}. Defaults to
 * {@link defaultHubIconsConfig}; override it with {@link provideHubIcons}.
 */
export const HUB_ICONS_CONFIG = new InjectionToken<HubIconsConfig>('HUB_ICONS_CONFIG', {
	providedIn: 'root',
	factory: () => defaultHubIconsConfig
});

/**
 * Registers the icon packs for `ng-hub-ui-icons` at the environment level.
 *
 * @param config - The packs map and optional `defaultPack`.
 * @returns Environment providers to add to `bootstrapApplication` / a route.
 *
 * @example
 * ```ts
 * provideHubIcons({
 *   defaultPack: 'fa',
 *   packs: { fa: faPack(), bi: bootstrapPack(), ms: materialSymbolsPack(), solar: solarPack() }
 * });
 * ```
 */
export function provideHubIcons(config: HubIconsConfig): EnvironmentProviders {
	return makeEnvironmentProviders([
		{
			provide: HUB_ICONS_CONFIG,
			useValue: { ...defaultHubIconsConfig, ...config }
		}
	]);
}
