## Cambios

### 1. Añadir nueva imagen al rotador
- Copiar el archivo subido (`blueprint_forever.webp`) a `public/about/blueprint-forever-1080w.webp`.
- En `src/pages/Home.tsx` (línea 78), agregar `"/about/blueprint-forever-1080w.webp"` al final del array `aboutImages` (queda como 7ª imagen del ciclo).
- No se toca el intervalo (línea 234) ni la transición de fade (línea 719). Sigue rotando con el mismo timing y efecto.

### 2. Cambiar el aspect ratio del contenedor en mobile a 9:16

Editar `src/index.css`:

- **Mobile (línea 243)**: cambiar `aspect-ratio: 1 / 1` → `aspect-ratio: 9 / 16` y subir `max-width` a `420px` para que el portrait no quede gigantesco en pantallas anchas-mobile.
- **Tablet 768–1023px (línea 259)**: cambiar `aspect-ratio: 1 / 1` → `aspect-ratio: 9 / 16` con `max-width: 480px`.
- **Desktop ≥1024px (líneas 320–326)**: sin cambios — el contenedor sigue llenando la columna derecha del grid 2×2 con `height: 100%` y `align-self: stretch`. No hay regla de aspect-ratio en este breakpoint, así que el desktop conserva su comportamiento landscape actual.

### 3. Comportamiento de las imágenes
Las `<img>` ya tienen `width:100%; height:100%; object-fit:cover; object-position:center` (líneas 715–721 en `Home.tsx`). No se modifica. Esto implica:
- En mobile, la nueva imagen vertical (1080×1920, ratio 9:16) se ve completa sin cropping.
- En mobile, las landscape existentes se recortan a los lados — comportamiento esperado.
- En desktop, todas las imágenes (incluida la nueva) llenan el contenedor landscape vía `object-fit: cover`.

## Lo que NO cambia
- Intervalo y animación del rotador.
- Cards, título y resto de la sección "Built for Human Evolution".
- Otros rotadores (`labImages`, `hackbarImages`) y otras páginas.
- Layout/altura de la sección en desktop.