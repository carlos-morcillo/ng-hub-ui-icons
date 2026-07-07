# Changelog

All notable changes to `ng-hub-ui-icons` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
