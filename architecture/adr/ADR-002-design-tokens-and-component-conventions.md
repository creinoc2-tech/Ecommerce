# ADR-002: Sistema de Tokens de Diseño y Convenciones de Componentes

**Estado:** Propuesto  
**Fecha:** 2026-06-04  
**Depende de:** ADR-001 (Arquitectura Visual)  
**Autores:** Equipo Frontend

---

## Contexto

Con la estructura de carpetas definida en ADR-001, este documento resuelve la capa visual concreta: cómo se nombran y aplican los colores, espaciados, tipografía y patrones de componente a través de todo el sistema. 

El análisis del código actual revela que **los colores están hardcodeados en al menos 14 componentes distintos**. Los casos más frecuentes:

| Color hardcodeado | Aparece en | Semántica real |
|---|---|---|
| `#0f0f10` | `index.css`, `hero.tsx`, `Header.tsx` | Fondo base del sistema |
| `#bca789` | `Header.tsx`, `collection-item.tsx`, `cta-banner.tsx`, `product-card.tsx` | Color primario / brand |
| `#232323` | `Header.tsx`, `collection-item.tsx`, `product-card.tsx` | Superficie de UI (botones, cards) |
| `#444` / `#444444` | `Header.tsx`, `Navbar.tsx`, `collection-item.tsx`, `hero.tsx` | Borde dashed |
| `#2A2A2A` | `section.tsx` | Borde dashed (variante oscura) |
| `#161616` | `collection-item.tsx` | Superficie secundaria (card background) |
| `gray-600` | `hero.tsx` | Borde dashed (usando clase Tailwind, inconsistente con los anteriores) |

Además se detectaron **dos patrones visuales de identidad** que se repiten pero no están formalizados:

1. `border border-dashed` como patrón estructural de cards y secciones
2. Hover con `scale-105` + `transition-transform duration-300` sobre imágenes

---

## Decisión

Formalizar un sistema de tokens en `src/styles/globals.css` usando variables CSS nativas con Tailwind v4, eliminando todos los colores hardcodeados. Definir además un conjunto de convenciones de componente que todos los archivos base deben seguir.

---

## 1. Tokens de Diseño (`src/styles/globals.css`)

### 1.1 Paleta de color en OKLCH

OKLCH garantiza perceptual uniformity: pasos iguales en lightness producen saltos visualmente iguales, a diferencia de hex o hsl.

```css
@import "tailwindcss";

@theme inline {

  /* ─── Primario (warm gold — identidad actual del proyecto) ─── */
  --color-primary:          oklch(0.72 0.055 68);    /* #bca789 */
  --color-primary-hover:    oklch(0.65 0.065 65);    /* #a68c6d */
  --color-primary-subtle:   oklch(0.82 0.035 70);    /* versión clara para fondos */
  --color-primary-fg:       oklch(0.12 0 0);         /* texto sobre primario */

  /* ─── Superficies oscuras (jerarquía de capas) ─── */
  --color-bg:               oklch(0.11 0 0);         /* #0f0f10 — fondo raíz */
  --color-surface:          oklch(0.135 0 0);        /* #161616 — cards */
  --color-surface-2:        oklch(0.16 0 0);         /* #1F1F1F — hover/active state */
  --color-surface-3:        oklch(0.185 0 0);        /* #232323 — botones secundarios */
  --color-surface-raised:   oklch(0.21 0 0);         /* #2c2c2c — hover de surface-3 */

  /* ─── Bordes ─── */
  --color-border:           oklch(0.29 0 0);         /* #444 — borde estándar */
  --color-border-dashed:    oklch(0.20 0 0);         /* #2A2A2A — borde dashed secciones */
  --color-border-subtle:    oklch(0.24 0 0);         /* borde sutil (hover) */

  /* ─── Texto ─── */
  --color-text:             oklch(0.97 0 0);         /* blanco casi puro */
  --color-text-muted:       oklch(0.65 0 0);         /* gray-400 — descripciones */
  --color-text-subtle:      oklch(0.50 0 0);         /* gray-500 — metadatos */
  --color-text-disabled:    oklch(0.40 0 0);         /* elementos deshabilitados */

  /* ─── Semánticos ─── */
  --color-destructive:      oklch(0.58 0.22 27);     /* rojo error */
  --color-success:          oklch(0.62 0.14 145);    /* verde éxito */
  --color-warning:          oklch(0.78 0.13 75);     /* ámbar aviso */

  /* ─── Tipografía ─── */
  --font-sans:  "Inter Variable", system-ui, sans-serif;
  --font-mono:  "JetBrains Mono Variable", "Roboto Mono", monospace;

  /* ─── Radio de borde ─── */
  --radius:     0.625rem;
  --radius-sm:  calc(var(--radius) - 4px);   /* 6px  — badges, chips */
  --radius-md:  calc(var(--radius) - 2px);   /* 8px  — inputs, botones */
  --radius-lg:  var(--radius);               /* 10px — cards */
  --radius-xl:  calc(var(--radius) + 4px);   /* 14px — modales, secciones grandes */
  --radius-2xl: calc(var(--radius) + 8px);   /* 18px — hero, galería de imágenes */

  /* ─── Spacing base ─── */
  --space-section: 5rem;   /* my-20 — margen vertical entre secciones */
}
```

### 1.2 Base layer

```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    color: var(--color-text);
    font-weight: 500;
  }
  /* Mono para precios y datos numéricos */
  [data-price], .price, .font-price {
    font-family: var(--font-mono);
  }
}
```

### 1.3 Animaciones globales

```css
/* Marquee (ya existe en index.css — consolidar aquí) */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee {
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.marquee-slow   { animation-duration: 50s; }
.marquee-medium { animation-duration: 35s; }
.marquee-fast   { animation-duration: 20s; }

/* Shimmer para skeletons */
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer { animation: shimmer 1.5s infinite; }
```

---

## 2. Convenciones de Componente

### 2.1 Patrón de Card base

Toda card de producto o colección sigue esta estructura CSS. Nada hardcodeado.

```tsx
// ✅ CORRECTO — con tokens
<div className="
  relative
  border border-dashed border-[--color-border-dashed]
  rounded-[--radius-2xl]
  bg-[--color-surface]
  p-5 lg:p-7
  transition-colors
  hover:border-[--color-border]
">

// ❌ INCORRECTO — hardcodeado (estado actual)
<div className="
  border border-dashed border-[#444]
  rounded-2xl
  bg-[#161616]
  p-5 lg:p-7
">
```

### 2.2 Patrón de imagen con hover overlay

El hover overlay es una convención de identidad del proyecto. Se estandariza así:

```tsx
// ✅ Patrón estándar para imágenes con hover
<div className="relative overflow-hidden rounded-[--radius-2xl] group">
  <img
    src={src}
    alt={alt}
    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
  />

  {/* Overlay de acciones — solo visible en hover */}
  <div className="
    absolute inset-0
    flex items-center justify-center gap-3
    bg-black/20 backdrop-blur-[2px]
    opacity-0 group-hover:opacity-100
    transition-all duration-300
  ">
    {/* Botones de acción */}
  </div>
</div>
```

> **Nota:** el `backdrop-blur-[2px]` es sutil intencional. No aumentar a valores mayores en el overlay de cards — reservar blur más intenso para modales.

### 2.3 Patrón de precio (font-mono obligatorio)

```tsx
// ✅ CORRECTO
<span className="font-mono font-bold text-[--color-primary]">
  ${price}
</span>

// ❌ INCORRECTO — color hardcodeado
<span className="font-bold text-[#bca789]">
  ${price}
</span>
```

### 2.4 Patrón de botón primario

```tsx
// ✅ CORRECTO
<button className="
  px-6 py-3
  rounded-[--radius-md]
  bg-[--color-primary]
  text-[--color-primary-fg]
  font-semibold text-sm
  hover:bg-[--color-primary-hover]
  transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed
">

// ❌ INCORRECTO (estado actual en Header.tsx)
<Link className="rounded-lg bg-[#bca789] px-6 py-4 text-sm font-medium text-black hover:bg-[#a68c6d]">
```

### 2.5 Patrón de botón secundario (surface)

```tsx
// ✅ CORRECTO — botones tipo icono o acción secundaria
<button className="
  p-2
  rounded-[--radius-md]
  bg-[--color-surface-3]
  text-[--color-text]
  border border-dashed border-[--color-border]
  hover:bg-[--color-surface-raised]
  transition-colors
">

// ❌ INCORRECTO (estado actual en Header.tsx)
<button className="relative cursor-pointer bg-[#232323] rounded-lg p-2">
```

### 2.6 Patrón de Sección

El componente `Section` (`src/components/base/common/section.tsx`) ya está bien estructurado. La única corrección es reemplazar el borde hardcodeado:

```tsx
// ✅ CORRECTO
<div className="
  relative z-10 overflow-hidden
  rounded-[--radius-xl]
  border-2 border-dashed border-[--color-border-dashed]
  ...
">

// ❌ INCORRECTO (estado actual en section.tsx)
<div className="
  border-2 border-dashed border-[#2A2A2A]
  ...
">
```

### 2.7 Patrón de Navbar link

Los nav links siguen el mismo patrón de Shop Stack: dashed border en reposo, fondo sólido en activo.

```tsx
// ✅ Definir en navbar.tsx
const baseLinkClass = `
  flex items-center justify-center
  h-10 px-5
  rounded-[--radius-md]
  border border-dashed border-[--color-border]
  text-[--color-text-muted]
  text-sm
  transition-all
  hover:bg-[--color-surface-3]
  hover:text-[--color-text]
  hover:border-transparent
`;

const activeLinkClass = `
  bg-[--color-surface-3]
  text-[--color-text]
  border-transparent
`;

// ❌ INCORRECTO (estado actual en Header.tsx)
activeLinkClassName="bg-[#232323] text-white border border-dashed border-[#444444] shadow-sm"
linkClassName="border border-dashed border-[#444444] bg-transparent text-white hover:bg-[#232323]"
```

---

## 3. Skeleton / Loading States

Todos los estados de carga siguen el mismo patrón de shimmer. No usar `opacity-50` ni `animate-pulse` de Tailwind — usar el shimmer definido en globals.

```tsx
// ✅ Patrón de skeleton para cards
export const ProductCardSkeleton = () => (
  <div className="
    border border-dashed border-[--color-border-dashed]
    rounded-[--radius-2xl]
    bg-[--color-surface]
    p-5 overflow-hidden
  ">
    {/* Imagen */}
    <div className="relative w-full aspect-square rounded-[--radius-xl] bg-[--color-surface-3] overflow-hidden">
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
    {/* Texto */}
    <div className="mt-4 space-y-2">
      <div className="relative h-4 w-3/4 rounded bg-[--color-surface-3] overflow-hidden">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="relative h-3 w-1/2 rounded bg-[--color-surface-3] overflow-hidden">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  </div>
);
```

---

## 4. Iconos

### 4.1 Estado actual

El proyecto tiene dos sistemas de iconos en paralelo:

- `lucide-react` — usado en `Header.tsx` (`ShoppingBag`), `product-card.tsx` (`Eye`, `ShoppingCart`, `Store`)
- Iconos SVG custom en `src/components/ui/icons/` — 14 archivos con formas decorativas propias del sistema (`ball-circle`, `dial-outline-dash`, `venn-icon`, etc.)

### 4.2 Decisión

**Mantener ambos sistemas con responsabilidades distintas:**

| Sistema | Uso |
|---|---|
| `lucide-react` | Iconos de UI funcional (carrito, búsqueda, menú, flechas, estrella) |
| `src/components/ui/icons/` | Iconos decorativos de identidad de marca (usados en banners, secciones, features) |

**Prohibido:** usar iconos de `react-icons` (actualmente `HiOutlineSearch` en `Header.tsx`). Migrar a lucide equivalente (`Search`).

```tsx
// ❌ Quitar dependencia react-icons
import { HiOutlineSearch } from "react-icons/hi";

// ✅ Usar lucide-react
import { Search } from "lucide-react";
```

### 4.3 Wrapper para iconos decorativos

```tsx
// src/components/ui/icons/index.ts
export { default as BallCircleIcon }      from "./ball-circle";
export { default as DialCircleIcon }      from "./dial-circle";
export { default as MagicCircleIcon }     from "./magic-circle";
export { default as MaskCircleIcon }      from "./mask-circle";
export { default as StarCircleIcon }      from "./star-circle";
export { default as StarburstIcon }       from "./starburst-icon";
export { default as TrophyCircleIcon }    from "./trophy-circle";
export { default as VennIcon }            from "./venn-icon";
// ... resto de iconos
```

---

## 5. Alias de paths obligatorios (`tsconfig.app.json` + `vite.config.ts`)

Para que todas las importaciones sean limpias y no dependan de rutas relativas:

```json
// tsconfig.app.json — agregar en compilerOptions
{
  "paths": {
    "@/*": ["./src/*"],
    "@components/*": ["./src/components/*"],
    "@base/*":       ["./src/components/base/*"],
    "@containers/*": ["./src/components/containers/*"],
    "@ui/*":         ["./src/components/ui/*"],
    "@pages/*":      ["./src/pages/*"],
    "@store/*":      ["./src/store/*"],
    "@hooks/*":      ["./src/hooks/*"],
    "@stack/*":      ["./src/stack/*"],
    "@styles/*":     ["./src/styles/*"]
  }
}
```

```ts
// vite.config.ts — agregar en resolve.alias
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@":           path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@base":       path.resolve(__dirname, "./src/components/base"),
      "@containers": path.resolve(__dirname, "./src/components/containers"),
      "@ui":         path.resolve(__dirname, "./src/components/ui"),
      "@pages":      path.resolve(__dirname, "./src/pages"),
      "@store":      path.resolve(__dirname, "./src/store"),
      "@hooks":      path.resolve(__dirname, "./src/hooks"),
      "@stack":      path.resolve(__dirname, "./src/stack"),
      "@styles":     path.resolve(__dirname, "./src/styles"),
    },
  },
});
```

---

## 6. Reglas de Linting Visual (ESLint + comentarios)

Añadir una regla personalizada o comentario de bloqueo en el equipo: **ningún valor hex ni rgb/hsl directo en className**.

```ts
// Regla sugerida para .eslintrc o notas en code review:
// ❌ className="text-[#bca789]"        → usar text-[--color-primary]
// ❌ className="bg-[#232323]"          → usar bg-[--color-surface-3]
// ❌ className="border-[#444]"         → usar border-[--color-border]
// ❌ style={{ color: "#bca789" }}      → usar style={{ color: "var(--color-primary)" }}
```

---

## 7. Tabla de migración de colores hardcodeados

Guía de sustitución para todos los colores detectados en el codebase:

| Valor actual | Variable CSS | Semántica |
|---|---|---|
| `#0f0f10` | `--color-bg` | Fondo raíz |
| `#161616` | `--color-surface` | Fondo de cards |
| `#1F1F1F` | `--color-surface-2` | Estado hover de links |
| `#232323` | `--color-surface-3` | Botones secundarios |
| `#2c2c2c` | `--color-surface-raised` | Hover de botones secundarios |
| `#2A2A2A` | `--color-border-dashed` | Borde dashed de secciones |
| `#444` / `#444444` | `--color-border` | Borde estándar |
| `#bca789` | `--color-primary` | Color primario / brand |
| `#a68c6d` | `--color-primary-hover` | Hover del primario |
| `#c5b9a5` | `--color-primary-subtle` | Fondo sección CTA |
| `text-gray-400` | `text-[--color-text-muted]` | Texto secundario |
| `text-gray-200` | `text-[--color-text]` | Texto principal |
| `text-white` | `text-[--color-text]` | Texto principal |
| `text-black` | `text-[--color-primary-fg]` | Texto sobre primario |
| `border-gray-600` | `border-[--color-border]` | Borde (hero) |

---

## Consecuencias

**Positivas:**

- Un solo lugar para cambiar toda la paleta del proyecto (globals.css)
- Posibilita añadir un tema claro en el futuro sin tocar componentes
- Elimina inconsistencias: actualmente `border-[#444]` y `border-gray-600` coexisten haciendo el mismo trabajo
- Las convenciones de componente documentan el lenguaje visual del sistema para nuevos integrantes

**Negativas / Trade-offs:**

- La sintaxis `bg-[--color-bg]` con variables CSS en Tailwind v4 es menos familiar que clases semánticas (`bg-background`). Se puede mitigar configurando aliases de color en `@theme`
- La migración de 14+ componentes con colores hardcodeados toma tiempo; se recomienda hacerlo archivo por archivo en la Fase 1 definida en ADR-001

---

## Trabajo pendiente relacionado

- `ADR-003` (sugerido): Convenciones de estado de formularios (validación visual, estados de error con `--color-destructive`)
- `ADR-004` (sugerido): Sistema de tipografía — escala de tamaños, jerarquía heading/body/caption

---

*Este ADR implementa los detalles visuales de la reorganización estructural propuesta en ADR-001.*
