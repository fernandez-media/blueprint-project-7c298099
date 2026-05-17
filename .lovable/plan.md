## Plan: Hack Bar — quitar Supplements + nuevo HACKBAR MENU

### 1. Eliminar la carta de Supplements
En `src/pages/HuellaRoja.tsx`, sección "FUEL YOUR SYSTEM" (~líneas 618-633):
- Remover el `<FuelCard ... name="SUPPLEMENTS" .../>`.
- Dejar únicamente la card "MEAL PREPS", centrada en su contenedor flex.

### 2. Nueva sección: HACKBAR MENU
Insertar inmediatamente después del bloque "FUEL YOUR SYSTEM" (antes de "HACKBAR STATION"), en el mismo archivo. Inspirada en la imagen adjunta pero traducida al lenguaje visual del sitio (rojo #FF3B3B, fondo negro, Michroma/Inter, glassmorphism + scanlines, no el look "papel" del Instagram).

#### Estructura del menú
Tres módulos + un build system:

- **PROTEIN MODULE** (dot rojo `#FF3B3B`) — "Selección de proteínas limpias, alta biodisponibilidad."
  - Churrasco · Pechuga · Salmón · Carne Molida
- **CARB MODULE** (dot blanco/outline) — "Energía funcional. Nada inflamatorio."
  - Majado de Viandas · Papas Salteadas · Arroz Jazmín
- **VEGGIE MODULE** (dot verde `#22C55E`) — "Micronutrientes. Digestión. Balance."
  - Espárragos · Brócoli · Zanahoria
- **BUILD SYSTEM** (icono engranaje) — "Elige: 1 proteína · 1 carb · 1 veggie"
- Tagline inferior: **"Feed clarity, not inflammation."**

#### Diseño visual (futurista, llamativo)
- Contenedor: tarjeta full-width con borde sutil rojo, `background: rgba(255,255,255,0.02)`, `backdropFilter: blur(14px)`, esquinas tipo HUD (corner ticks como ya existen en el proyecto, p.ej. `.corner-tl/tr/bl/br`).
- Header del menú:
  - Título "HACKBAR" en Michroma muy grande + "MENU" en peso ligero al lado.
  - Subtítulo "BLUEPRINT NUTRITION DIVISION" en Orbitron 10px tracking amplio.
  - Línea horizontal animada (gradient rojo → transparente) debajo del header.
- Cada módulo:
  - Dot animado con pulso (`box-shadow` rojo/verde radial).
  - Título en Michroma 18-20px (palabra clave + "MODULE" más ligero).
  - Descripción Inter 12px gris.
  - Lista de ítems con guion ASCII largo (`— ITEM`), uppercase, Space Grotesk, hover → ítem se desplaza 4px a la derecha + brillo rojo.
- Animaciones (Framer Motion, ya cargado):
  - Stagger reveal de módulos al entrar en viewport (`scrollStaggerCinematicFeatures` ya existe en `src/lib/scrollAnimations.ts`).
  - Scanline horizontal sutil cruzando la carta cada ~6s (CSS keyframes).
  - Grid de fondo punteado muy tenue (similar a `hud-topo-grid`).
- BUILD SYSTEM destacado como bloque inferior con borde gradient animado y CTA visual "1 PROTEIN · 1 CARB · 1 VEGGIE".
- Tagline final dentro de una "terminal bar" negra con bordes de puntos (`···· Feed clarity, not inflammation. ····`), reutilizando el estilo de `.bio-terminal-bar` que ya existe en el proyecto.

#### Implementación técnica
- Nuevo componente local `HackbarMenu` definido dentro de `HuellaRoja.tsx` (o como archivo nuevo `src/components/HackbarMenu.tsx` si crece). Mantener todo en estilos inline + clases ya existentes para no inflar CSS.
- Mobile-first (390px): módulos apilados en columna, padding `24px`, título HACKBAR `clamp(40px, 12vw, 80px)`. Sin wrap del título.
- Desktop: módulos en grid 3 columnas (Protein / Carb / Veggie), BUILD SYSTEM full-width abajo.

### 3. QA
- Verificar build (`tsc --noEmit` automático).
- Revisar a 390px y desktop que nada se rompa y el menú quede entre Meal Preps y Hackbar Station.

### Archivos afectados
- `src/pages/HuellaRoja.tsx` (editar)
