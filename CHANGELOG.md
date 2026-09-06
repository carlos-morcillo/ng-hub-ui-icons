# Changelog

All notable changes to `ng-hub-ui-icons` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.1.3] - 2026-09-06

### Added

- **`FUNCTIONALITIES.md`** — the per-feature coverage table the rest of the ecosystem ships, so a
  reader can see what the library does and which parts a live example actually demonstrates, instead
  of inferring both from the list of examples.

### Changed

- **A name the registry cannot resolve is handed to the application's `ErrorHandler` instead of
  written straight into its console.** Both `<hub-icon>` and `[hubIcon]` caught the failure and
  called `console.error` on it, which was never the library's decision to make: an application that
  routes its errors to a reporter never received it, one that keeps a quiet console could not
  silence it, and it was printed in production builds too, where the person reading it can act on
  nothing. Angular already ships the seam, and its default `ErrorHandler` prints to the console —
  so a consumer who has configured nothing sees what they saw before, and everyone else finally
  gets a say. The icon still fails soft to an empty glyph.

### Fixed

- **The pack's `cssVars` bridge follows the pack that actually draws the icon.** `resolve()` expands
  the `pack:variant:name` shorthand, but the bridge lookup did not: it read `pack` alone, so
  `<hub-icon name="ms:home" />` was dressed with the default pack's custom properties — or with none
  — while `pack="ms"` got the right ones. Two entry points reading a different pack out of the same
  reference is the bug; both now expand it the same way. `HubIconRegistry.cssVars()` takes the icon
  name as an optional second argument to do it, so existing calls keep working. Latent for consumers
  of the shipped presets, none of which declares a bridge, and breaking for anyone who wrote a pack
  with one and used the documented shorthand.
- **The input table describes the directive too, instead of only the component.** `name` was listed
  as required for both forms, but on `[hubIcon]` it is optional and falls back to the value bound to
  the directive; and `hubIcon` — the input the usage section teaches two screens earlier — appeared
  in no table at all, so the only way to learn it existed was to read the source. The documentation
  links pointed at the site root as well, leaving the reader to hunt for the icons page; they now
  open it directly.
- **The stylesheets are reachable by the subpath the README documents.** The manifest declared no
  `exports`, so ng-packagr generated the minimal map (`.` and `./package.json`) and every sheet
  shipped in `styles/` stayed outside the package's public surface. Resolvers that fall back to the
  filesystem — the Angular CLI's Sass plugin, dart-sass's own `pkg:` importer — found them anyway,
  which is why nobody noticed; anything resolving strictly through `exports` answered
  `ERR_PACKAGE_PATH_NOT_EXPORTED` on the very line the docs tell you to write, leaving a relative
  walk into `node_modules` as the only way in. `./styles` now resolves, along with the `icon`,
  `icon-base` and `icon-theme` sheets.

## [22.1.2] - 2026-09-01

### Changed

- **The `homepage` in the manifest points at this library's own documentation page** rather than at
  the site root. It is the link a registry shows beside the package and the one a reader clicks from
  it, and landing on a front page they then have to search is a worse answer than landing on the
  reference for the package they were already looking at. Metadata only — no code, no types, no
  styles change, and nothing a consumer imports is affected.

## [22.1.1] - 2026-08-08

### Fixed

- Documentation links now point at the canonical localized URLs. The README linked to `https://hubui.dev/<path>` with no locale prefix and no trailing slash, and both forms are 301-redirected, so every reader arriving from npm or GitHub landed on a redirect instead of the canonical page.

## [22.1.0] - 2026-07-07

### Added

- **`hub-icon-theme(...)` mixin** — one-call token theming for `<hub-icon>` / `[hubIcon]`: `color`, `size`, and the variable-font axes `weight` / `fill` / `grade` / `optical-size`. Null-defaulted and additive; `@use 'ng-hub-ui-icons/styles' as *;`.

## [22.0.0] - 2026-07-01

### Added

- Initial release: an **icon-set-agnostic** icon renderer for Angular.
- `<hub-icon>` component and `[hubIcon]` directive — render an icon by `name` (+ optional `pack` / `variant`), or with the `pack:variant:name` shorthand.
- `provideHubIcons({ defaultPack, packs })` central pack registry.
- Pack factories `classPack` / `ligaturePack` / `svgPack` and built-in presets `faPack` (Font Awesome), `bootstrapPack` (Bootstrap Icons), `materialSymbolsPack` (Material Symbols) and `solarPack` (Solar). No icon set is bundled — the host app loads the set's CSS/font/SVG; the library only knows each set's naming convention.
- Abstract CSS-variable theming: `--hub-icon-size`, `--hub-icon-color` and the variable-font axes `--hub-icon-fill` / `--hub-icon-weight` / `--hub-icon-grade` / `--hub-icon-optical-size`, so one token set themes any pack uniformly.
