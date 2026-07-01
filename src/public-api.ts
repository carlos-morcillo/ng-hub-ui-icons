/*
 * Public API Surface of ng-hub-ui-icons
 */

// Components & directives
export { HubIconComponent } from './lib/components/icon/icon.component';
export { HubIconDirective } from './lib/directives/icon.directive';

// Configuration & registry
export { HUB_ICONS_CONFIG, defaultHubIconsConfig, provideHubIcons } from './lib/services/icons-config';
export { HubIconRegistry } from './lib/services/icon-registry.service';

// Models & types
export type {
	HubIconRenderSpec,
	HubIconClassesSpec,
	HubIconSvgSpec,
	HubIconUseSpec,
	HubIconImgSpec
} from './lib/models/icon-render-spec';
export type { HubIconPack } from './lib/models/icon-pack';
export type { HubIconsConfig } from './lib/models/icons-config';

// Pack factories
export { classPack } from './lib/packs/class-pack';
export type { ClassPackOptions } from './lib/packs/class-pack';
export { ligaturePack } from './lib/packs/ligature-pack';
export type { LigaturePackOptions } from './lib/packs/ligature-pack';
export { svgPack } from './lib/packs/svg-pack';
export type { SvgPackOptions } from './lib/packs/svg-pack';

// Built-in pack presets
export { faPack } from './lib/packs/font-awesome';
export type { FaPackOptions, FaVariant } from './lib/packs/font-awesome';
export { bootstrapPack } from './lib/packs/bootstrap';
export { materialSymbolsPack } from './lib/packs/material-symbols';
export type { MaterialSymbolsPackOptions, MaterialSymbolsVariant } from './lib/packs/material-symbols';
export { solarPack } from './lib/packs/solar';
export type { SolarPackOptions, SolarVariant } from './lib/packs/solar';
