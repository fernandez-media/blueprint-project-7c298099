## Plan: Animación cinematográfica para los 4 Features de Home

### Objetivo
Añadir una animación de entrada cinematográfica para las 4 tarjetas de features (Elite Training, Nutrition, Recovery, Mindset) en la home page, que se vea impresionante tanto en móvil como desktop sin afectar el tiempo de carga.

### Estrategia (zero extra weight)
- Todo basado en Framer Motion + CSS (ya cargados).
- Sin imágenes, videos, ni fuentes adicionales.
- GPU-accelerated transforms únicamente.

### Cambios

#### 1. `src/lib/scrollAnimations.ts`
- Nuevas variantes específicas para features:
  - `cinematicFeatureReveal` — entrada con `clip-path` de reveal + blur + scale settle.
  - `cinematicFeatureStagger` — stagger más dramático (alterna direcciones por índice).
  - `cinematicFeatureMobile` — slide desde la derecha con overshoot sutil, optimizado para 390px.
- Nuevos helpers:
  - `scrollStaggerCinematicFeatures` — bundle para el contenedor de features.

#### 2. `src/components/FeatureCard.tsx`
- Recibe nueva prop `direction?: "up" | "left" | "right" | "down"` para variar la dirección de entrada según posición en grid.
- Añade un **scan-line sweep** (div absoluto con gradiente lineal que cruza la tarjeta horizontalmente al entrar) — efecto "tech cinematic".
- El scan-line se dispara vía Framer Motion `animate` sincronizado con la variante de entrada.
- Mantiene el glow hover existente.

#### 3. `src/pages/Home.tsx`
- Contenedor de features (`about-features-desktop` y `about-features-mobile`) usa `scrollStaggerCinematicFeatures`.
- Pasa `direction` alternada a cada FeatureCard:
  - Desktop 2x2: arriba-izq → arriba-der → abajo-izq → abajo-der
  - Mobile lista: todos desde abajo con stagger rápido

### Mobile-first
- Las distancias de slide son mayores en móvil (70px vs 40px desktop) para que el efecto sea visible en pantallas pequeñas.
- Stagger más corto en móvil (0.06s) para que no se sienta lento.
- El scan-line dura menos en móvil (600ms vs 900ms).

### Reduced motion
- Todo colapsa a STATIC_VARIANT cuando `prefers-reduced-motion: reduce` o `data-no-motion`.

```text
Desktop grid (2x2):
┌─────────────┬─────────────┐
│  ← slide    │    slide →  │
│   from      │    from     │
│  top-left   │   top-right │
├─────────────┼─────────────┤
│  ← slide    │    slide →  │
│   from      │    from     │
│ bottom-left │ bottom-right│
└─────────────┴─────────────┘

Mobile list (1 col):
Each card slides ↑ from bottom with stagger
```