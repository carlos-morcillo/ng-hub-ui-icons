# Functionalities of Icons Library

This table details the functionalities of the `ng-hub-ui-icons` library and indicates which ones are covered by interactive examples.

The library ships two consumers of the same registry: `<hub-icon>`, the standalone icon element, and `[hubIcon]`, the directive that renders an icon on an element you own.

## Component (`<hub-icon>`)

| Category | Functionality | Example Covered |
| :--- | :--- | :---: |
| **Icon reference** | Name from the default pack (`name`) | ✅ |
| | Explicit pack (`pack`) | ✅ |
| | Explicit variant (`variant`) | ✅ |
| | `pack:variant:name` shorthand | ✅ |
| | `pack:name` shorthand | ❌ |
| | Explicit `pack` / `variant` overriding the shorthand | ❌ |
| **Render kinds** | Class glyphs (`kind: 'classes'`) | ✅ |
| | Ligature glyphs (name as text content) | ✅ |
| | Inline SVG (`kind: 'svg'`) | ✅ |
| | Sprite reference (`kind: 'use'`) | ✅ |
| | Image (`kind: 'img'`) | ✅ |
| **Appearance** | Per-instance size (`size`) | ✅ |
| | Per-instance colour (`color`) | ✅ |
| | Continuous rotation (`spin`) | ✅ |
| **Accessibility** | Accessible name (`label` → `role="img"` + `aria-label`) | ✅ |
| | Decorative by default (`aria-hidden="true"`) | ✅ |
| | `alt` carried by an `img` render spec | ✅ |
| **Resilience** | Unknown pack fails soft (logs, renders an empty glyph) | ❌ |

## Directive (`[hubIcon]`)

| Category | Functionality | Example Covered |
| :--- | :--- | :---: |
| **Icon reference** | Name bound on the directive (`[hubIcon]="'home'"`) | ✅ |
| | Name from the `name` input | ✅ |
| | `name` winning over `[hubIcon]` when both are set | ❌ |
| | Explicit pack / variant | ✅ |
| | `pack:variant:name` shorthand | ❌ |
| **Host handling** | Keeps the host's own classes and attributes | ❌ |
| | Removes only its own classes when the icon changes | ❌ |
| | Empties the host when the reference becomes empty | ❌ |
| **Render kinds** | Class glyphs and ligature glyphs | ✅ |
| | Inline SVG, sprite and image | ❌ |
| **Base styles** | `@use 'ng-hub-ui-icons/styles'` for directive-only apps | ❌ |

## Registry and packs

| Category | Functionality | Example Covered |
| :--- | :--- | :---: |
| **Configuration** | `provideHubIcons({ packs })` | ✅ |
| | `defaultPack` | ✅ |
| | `HUB_ICONS_CONFIG` token provided directly | ❌ |
| | `defaultHubIconsConfig` export | ❌ |
| **Presets** | `faPack(options?)` (Font Awesome) | ✅ |
| | `bootstrapPack()` (Bootstrap Icons) | ✅ |
| | `materialSymbolsPack(options?)` (Material Symbols) | ✅ |
| | `solarPack(options?)` (Solar) | ✅ |
| | Preset default variant (`defaultVariant` / `variant`) | ❌ |
| | Solar class template override (`template`) | ❌ |
| **Factories** | `classPack({ template })` | ❌ |
| | `ligaturePack({ baseClass })` | ❌ |
| | `svgPack({ map })` | ✅ |
| | `svgPack({ resolve })` | ❌ |
| | Hand-written `HubIconPack` (`use` / `img` render specs) | ✅ |
| | Pack `cssVars` bridge (`classPack` / `ligaturePack`) | ❌ |
| **Service** | `HubIconRegistry.resolve(name, pack?, variant?)` | ❌ |
| | `HubIconRegistry.cssVars(pack?, name?)` | ❌ |
| | Actionable errors for a missing or unknown pack | ❌ |

## Styling

| Category | Functionality | Example Covered |
| :--- | :--- | :---: |
| **CSS Variables** | `--hub-icon-size` | ✅ |
| | `--hub-icon-color` | ✅ |
| | `--hub-icon-fill` | ✅ |
| | `--hub-icon-weight` | ✅ |
| | `--hub-icon-grade` | ❌ |
| | `--hub-icon-optical-size` | ❌ |
| **Sass** | `hub-icon-theme()` mixin | ✅ |
| | `ng-hub-ui-icons/styles` subpath entry points | ❌ |
| **Structure** | BEM classes (`hub-icon__glyph`, `__svg`, `__img`) | ❌ |

## Integration

| Category | Functionality | Example Covered |
| :--- | :--- | :---: |
| **Composition** | Projected into other components (buttons, links, menus) | ✅ |
| | Icon side following the markup order | ✅ |

---

_Note: ✅ indicates an active interactive example or playground control is available in the documentation. ❌ indicates functionality exists but is only shown as a code snippet, or not shown at all._
