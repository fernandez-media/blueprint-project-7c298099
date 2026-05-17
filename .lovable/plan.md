## Plan: Hackbar Menu refinements

Archivo principal: `src/components/HackbarMenu.tsx` (+ ajustes menores en `src/pages/HuellaRoja.tsx`).

### 1. Eliminar el título externo "HACKBAR MENU"
- En `HackbarMenu.tsx`: quitar el `<motion.p>HACKBAR MENU</motion.p>` que va arriba de la card.
- Reducir el `padding-top` de la `<section>` para que la card quede pegada justo después de Meal Preps.
- En `HuellaRoja.tsx`: confirmar que no haya wrapper extra que agregue margen superior; si lo hay, reducirlo.

### 2. Header en una sola línea: huella + "HACKBAR MENU"
Problema actual: la huella está absoluta a la derecha y "HACKBAR" hace overflow en mobile (390px).

Cambios en `.hbm-header`:
- Reestructurar a una sola fila horizontal: `[fingerprint] [HACKBAR MENU + sub]`.
- La huella pasa a vivir dentro del mismo flex row, a la izquierda del título (tamaño `clamp(34px, 9vw, 56px)` para que no domine en mobile).
- `.hbm-title`: quitar `white-space: nowrap`, bajar el `clamp` a `clamp(26px, 9vw, 64px)` para que entre en 390px sin overflow. "MENU" se mantiene en la misma línea con `clamp(16px, 5vw, 36px)`.
- En mobile, usar `flex-wrap: nowrap` y `min-width: 0` en el contenedor de texto para forzar que todo quepa en una línea.
- El subtítulo "BLUEPRINT NUTRITION DIVISION" queda debajo del título (no en la misma línea), tal como pide el mock.

### 3. Tagline "Feed clarity, not inflammation." en una sola línea
- En `.hbm-tagline`: agregar `flex-wrap: nowrap` y al texto `white-space: nowrap`.
- Reducir tracking en mobile: `letter-spacing: clamp(0.06em, 1vw, 0.22em)` y `font-size: clamp(10px, 2.6vw, 12px)`.
- Los `.hbm-tagline-dots` mantienen `flex: 1` pero con `min-width: 12px` para no romper.

### 4. Build system interactivo (tap/click)
Convertir cada `.hbm-list-item` en un botón seleccionable. Reglas:
- Estado local en `HackbarMenu`: `const [selection, setSelection] = useState<{ PROTEIN?: string; CARB?: string; VEGGIE?: string }>({})`.
- Click en un ítem → setea el ítem en su módulo correspondiente (toggle: click de nuevo lo deselecciona).
- Solo un ítem activo por módulo (single-select por categoría).
- Estilo del ítem seleccionado:
  - Fondo: `rgba(color,0.10)` (rojo / blanco / verde según módulo).
  - Borde-izquierdo o dash más grueso y brillante en el color del módulo.
  - Checkmark `✓` al final, en el color del módulo.
  - `text-shadow` glow más fuerte.
- Cursor `pointer`, `role="button"`, `aria-pressed`, soporte de teclado (Enter/Space).

Actualización del bloque BUILD SYSTEM:
- Reemplazar la fórmula estática `1 PROTEIN · 1 CARB · 1 VEGGIE` por un mini "receipt" en vivo:
  - 3 slots: `PROTEIN: [—— o nombre seleccionado]`, `CARB: …`, `VEGGIE: …`.
  - Cada slot con su color y un dot que se enciende cuando hay selección.
  - Contador "X / 3 LOCKED" a la derecha.
  - Cuando los 3 estén seleccionados: aparece micro badge "READY" pulsante en rojo + el sweep gradient se acelera.
- Botón "RESET" pequeño (texto link estilo terminal) para limpiar la selección. No CTA de checkout — solo selector visual.

### 5. QA
- Build TS automático.
- Verificar 390px: header en una línea, tagline en una línea, sin overflow horizontal de la card.
- Verificar desktop: huella + título alineados, grid 3 columnas intacto.
- Verificar interacción: seleccionar/deseleccionar, single-select por módulo, contador 0/3 → 3/3.

### Archivos afectados
- `src/components/HackbarMenu.tsx` (editar)
- `src/pages/HuellaRoja.tsx` (eliminar título externo si vive ahí, o solo ajustar spacing)
