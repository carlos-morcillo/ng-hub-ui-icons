# Breaking Changes

This file documents breaking changes and migration steps for `ng-hub-ui-icons`.

The major version tracks the targeted Angular major, so it cannot be raised to signal a
breaking change. This file is the notice the version number cannot give.

## [22.2.0] - 2026-09-07

### `[hubIcon]` now owns `role`, `aria-label` and `aria-hidden` on its host

**What changed.** The directive used to declare nothing but `class="hub-icon"`, leaving the
host's accessibility to whoever applied it. It now binds the three attributes `<hub-icon>` has
always bound: a label-less icon is `aria-hidden="true"`, and one with `label` is `role="img"`
carrying that `aria-label`. Because they are bindings, they replace whatever the element was
written with — a `role="button"` or an `aria-label` authored by hand is removed.

**Who is affected.** Anyone who gave the `[hubIcon]` host its accessible name — or any other
role — through attributes on the element:

```html
<!-- before: the accessible name came from the element -->
<i hubIcon name="trash" role="img" aria-label="Delete"></i>
```

That icon now ends up `aria-hidden="true"` with no role and no name, so it disappears from the
accessibility tree instead of being announced.

**How to migrate.** Move the name to the `label` input:

```html
<!-- after -->
<i hubIcon name="trash" label="Delete"></i>
```

If the element needed a role of its own — an icon that is itself the button — put the directive
on a child element instead and leave the role on the parent, where it belongs:

```html
<button type="button" aria-label="Delete"><i hubIcon name="trash"></i></button>
```

**If you do nothing.** Nothing breaks visually and nothing fails to compile; the icon is drawn
exactly as before. Only the accessibility tree changes, so the loss is silent — which is why it
is written here.

## [22.1.3] - 2026-09-06

No breaking changes for consumers of the shipped presets. `HubIconRegistry.cssVars()` gained an
optional second argument (the icon name) so the pack bridge follows the `pack:variant:name`
shorthand; existing calls keep working, but a hand-written pack declaring `cssVars` that was
used through the shorthand now receives the custom properties of the pack that actually draws
the icon rather than those of the default pack.

## [22.0.0] - 2026-07-01

Initial release. No breaking changes.

The major version starts at `22` to match the rest of the `ng-hub-ui` family, whose major always
tracks the targeted Angular major — it does not imply twenty-one earlier releases of this
library.
