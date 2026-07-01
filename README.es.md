# ng-hub-ui-icons

[![npm](https://img.shields.io/npm/v/ng-hub-ui-icons.svg)](https://www.npmjs.com/package/ng-hub-ui-icons)
[![license](https://img.shields.io/npm/l/ng-hub-ui-icons.svg)](LICENSE)

> Léelo en otros idiomas: [English](README.md)

Renderizado de iconos **agnóstico al set** para Angular. Muestra **Font Awesome**, **Bootstrap Icons**, **Material Symbols**, **Solar** o tus **propios SVG** con una única API — y **sin dependencia dura** de ningún paquete de iconos. Tú cargas el CSS/fuente/SVG del set en tu app; `ng-hub-ui-icons` solo conoce la convención de nombres de cada set y los tematiza de forma uniforme con variables CSS `--hub-icon-*`.

Parte del ecosistema [ng-hub-ui](https://hubui.dev/).

## Documentación y ejemplos en vivo

Documentación completa y ejemplos interactivos: **[hubui.dev](https://hubui.dev/)**

## 🚀 Inicio rápido

### 1. Instalación

```bash
npm install ng-hub-ui-icons
```

Después carga en tu app el/los set(s) de iconos que quieras — consulta [Sets de iconos compatibles](#-sets-de-iconos-compatibles) para el enlace y la hoja de estilos de cada set. Esta librería **no** incluye ningún recurso de iconos.

### 2. Registra tus packs

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHubIcons, faPack, bootstrapPack, materialSymbolsPack, solarPack } from 'ng-hub-ui-icons';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHubIcons({
			defaultPack: 'fa',
			packs: {
				fa: faPack({ defaultVariant: 'solid' }),
				bi: bootstrapPack(),
				ms: materialSymbolsPack({ variant: 'outlined' }),
				solar: solarPack({ variant: 'linear' })
			}
		})
	]
};
```

### 3. Úsalo

```html
<!-- pack por defecto (fa) -->
<hub-icon name="house" />

<!-- pack / variante explícitos -->
<hub-icon name="house" pack="bi" />
<hub-icon name="home" pack="ms" variant="rounded" />

<!-- atajo pack:variant:name -->
<hub-icon name="fa:brands:github" label="GitHub" />

<!-- tamaño y color, etiqueta accesible -->
<hub-icon name="trash" color="var(--hub-sys-color-danger)" size="1.5rem" label="Eliminar" />
```

## 🎨 Sets de iconos compatibles

La librería **no** incluye ningún recurso de iconos — trae un preset ligero por set popular y tú cargas la hoja de estilos de ese set una vez en tu app (`index.html` o estilos globales). Explora el set, elige nombres de él y registra su preset en `provideHubIcons`.

| Set | Preset | Explorar iconos | Añadir a tu app (cargar una vez) |
| --- | --- | --- | --- |
| **Font Awesome** 6 | `faPack()` | [fontawesome.com/icons](https://fontawesome.com/icons) | `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css">` |
| **Bootstrap Icons** | `bootstrapPack()` | [icons.getbootstrap.com](https://icons.getbootstrap.com/) | `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">` |
| **Material Symbols** | `materialSymbolsPack()` | [fonts.google.com/icons](https://fonts.google.com/icons) | `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">` |
| **Solar** | `solarPack()` | [icon-sets.iconify.design/solar](https://icon-sets.iconify.design/solar/) | Sin webfont — cárgalo vía [Iconify CSS](https://iconify.design/docs/usage/css/): `<link rel="stylesheet" href="https://api.iconify.design/solar.css?icons=home-bold,star-bold">` y apunta el `template` del pack a las clases `.icon--solar--<name>-<variant>` (o usa `svgPack`). |

### Usa tu propio set

Cualquier otra fuente funciona sin preset:

- **Basado en clases** (webfont) → [`classPack`](#packs-personalizados) con un `template` que construya sus nombres de clase.
- **Basado en ligaduras** (fuente) → `ligaturePack`.
- **SVG inline** → `svgPack({ map })` (tu propio arte, sin set de terceros).
- **Sprite SVG** → un pack que devuelva `{ kind: 'use', href: '#id' }` (o `assets/sprite.svg#id`).
- **Imágenes** (banderas, logos, emoji) → un pack que devuelva `{ kind: 'img', src, alt }`.

> `size` tematiza todos los modos; `color` tematiza glyphs y SVG con `currentColor`/máscara, pero no imágenes ráster.

## 📦 Descripción

`ng-hub-ui-icons` desacopla *cómo referencias un icono* de *qué set lo dibuja*. Un **pack** es un resolver puro `(nombre, variante?) → spec de render`; la librería trae factorías y presets para los sets populares pero no empaqueta ninguno, así tu bundle se mantiene ligero y puedes mezclar sets libremente. Un único juego de tokens `--hub-icon-*` tematiza todos los packs por igual.

## 🎯 Características

- **Agnóstica** — Font Awesome, Bootstrap Icons, Material Symbols (ligadura + ejes de fuente variable), Solar, sprites, SVG inline e `<img>` — todo tras una API.
- **Sin dependencias de iconos** — no empaqueta fuentes/SVG; tú cargas el set, la librería lo formatea.
- **Componente y directiva** — `<hub-icon>` para iconos sueltos, `[hubIcon]` para decorar tu propio elemento.
- **Registro central** — `provideHubIcons({ defaultPack, packs })`; overrides `pack` / `variant` por uso y atajo `pack:variant:name`.
- **Theming uniforme** — `--hub-icon-size` / `--hub-icon-color` (+ ejes de fuente variable) funcionan en todos los sets.
- **Accesible** — `label` expone `role="img"` + `aria-label`; los iconos sin label quedan `aria-hidden`.
- **Packs componibles** — factorías `classPack` / `ligaturePack` / `svgPack` para cualquier set propio, más los modos de render sprite (`use`) e imagen (`img`).

## ⚙️ Uso

### Componente

```html
<hub-icon name="house" />
<hub-icon name="house" pack="bi" />
<hub-icon name="home" pack="ms" variant="sharp" />
<hub-icon name="spinner" spin label="Cargando" />
```

### Directiva

Decora un elemento tuyo — la directiva conserva tus clases y solo gestiona las que resuelve el pack:

```html
<i class="me-2" hubIcon name="house"></i>
<span [hubIcon]="'home'" pack="ms" variant="rounded"></span>
```

> Para uso solo con la directiva (sin renderizar nunca `<hub-icon>`), incluye los estilos base una vez: `@use 'ng-hub-ui-icons/styles' as *;`.

### Packs personalizados

```ts
import { provideHubIcons, classPack, svgPack } from 'ng-hub-ui-icons';

provideHubIcons({
	defaultPack: 'app',
	packs: {
		// cualquier set basado en clases
		myset: classPack({ template: (name, variant) => `ms ms-${variant ?? 'line'}-${name}`, defaultVariant: 'line' }),
		// tus propios SVG inline
		app: svgPack({ map: { logo: '<svg viewBox="0 0 24 24">…</svg>' } })
	}
});
```

### Theming

Todos los packs leen los mismos tokens, así que tematizas una vez:

```css
.toolbar hub-icon {
	--hub-icon-size: 1.25rem;
	--hub-icon-color: var(--hub-sys-text-muted);
}

/* ejes de fuente variable de Material Symbols */
.filled hub-icon {
	--hub-icon-fill: 1;
	--hub-icon-weight: 600;
}
```

### Iconos en otros componentes

Sin adapter — basta proyectar un `<hub-icon>` como contenido. Por ejemplo, dentro de un botón de `ng-hub-ui` el lado del icono sigue el orden del marcado:

```html
<button hubButton><hub-icon name="floppy-disk" /> Guardar</button>
<button hubButton>Siguiente <hub-icon name="arrow-right" /></button>
```

## 🔧 API

### Inputs de `<hub-icon>` / `[hubIcon]`

| Input | Tipo | Por defecto | Descripción |
| ----- | ---- | ----------- | ----------- |
| `name` | `string` | — | Nombre del icono. Acepta el atajo `pack:variant:name` / `pack:name`. |
| `pack` | `string` | `defaultPack` | Clave del pack; sobrescribe el pack del atajo. |
| `variant` | `string` | por defecto del pack | Variante; sobrescribe la variante del atajo. |
| `size` | `string` | `1em` | Tamaño por instancia (`--hub-icon-size`). _(solo componente)_ |
| `color` | `string` | `currentColor` | Color por instancia (`--hub-icon-color`). _(solo componente)_ |
| `label` | `string` | — | Etiqueta accesible (`role="img"` + `aria-label`). _(solo componente)_ |
| `spin` | `boolean` | `false` | Rotación continua. _(solo componente)_ |

### Packs

`faPack(options?)` · `bootstrapPack()` · `materialSymbolsPack(options?)` · `solarPack(options?)` — presets integrados.
`classPack(options)` · `ligaturePack(options)` · `svgPack(options)` — factorías genéricas para cualquier set.

## 🎨 Tokens de estilo

| Token | Por defecto | Descripción |
| ----- | ----------- | ----------- |
| `--hub-icon-size` | `1em` | font-size del glyph / ancho y alto del SVG |
| `--hub-icon-color` | `currentColor` | color del glyph / fill del SVG |
| `--hub-icon-fill` | `0` | eje `FILL` de Material Symbols |
| `--hub-icon-weight` | `400` | eje `wght` de Material Symbols |
| `--hub-icon-grade` | `0` | eje `GRAD` de Material Symbols |
| `--hub-icon-optical-size` | `24` | eje `opsz` de Material Symbols |

## ♿ Accesibilidad

Pasa `label` para iconos con significado (se renderizan como `role="img"` con `aria-label`). Omítelo en iconos decorativos, que quedan automáticamente `aria-hidden="true"`.

## 📊 Changelog

Consulta [CHANGELOG.md](CHANGELOG.md).

## 📄 Licencia

MIT © [Carlos Morcillo](https://www.carlosmorcillo.com)
