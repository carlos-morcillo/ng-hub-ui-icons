import { HubIconPack } from './icon-pack';

/**
 * Global configuration for `ng-hub-ui-icons`, supplied through
 * `provideHubIcons()`. Registers the available icon packs and, optionally, the
 * pack used when a call site omits `pack`.
 */
export interface HubIconsConfig {
	/** Pack key used when `<hub-icon>` / `[hubIcon]` does not specify one. */
	readonly defaultPack?: string;
	/** Registered packs, keyed by the name referenced at call sites. */
	readonly packs: Readonly<Record<string, HubIconPack>>;
}
