# Cambios solicitados

Cuatro ediciones puntuales de texto. Sin cambios de diseño ni de lógica.

## 1. Loader inicial — "SYSTEM INIT" → "SYSTEM UNIT"

**Archivo:** `src/components/HomeLoader.tsx` (línea 101)

- Antes: `BLUEPRINT // SYSTEM INIT`
- Después: `BLUEPRINT // SYSTEM UNIT`

## 2. Título de pestaña del browser para cada pilar

Actualmente los títulos son largos ("Blueprint Lab — Elite Training System | Blueprint Project", etc.). Los simplifico al nombre exacto que pediste, para que la pestaña del navegador muestre solo eso.

| Ruta | Archivo | Nuevo `<title>` |
|------|---------|-----------------|
| `/huella-azul` | `src/pages/HuellaAzul.tsx` | `Blueprint Lab` |
| `/huella-roja` | `src/pages/HuellaRoja.tsx` | `Hack Bar` |
| `/huella-verde` | `src/pages/HuellaVerde.tsx` | `Reset` |

Solo cambio el prop `title` que recibe el componente `<SEO>` en cada página. El componente `SEO` ya escribe `document.title`, así que la pestaña del browser reflejará el cambio inmediatamente al navegar a cada ruta.

## Fuera de alcance

- No modifico rutas (`/huella-azul`, `/huella-roja`, `/huella-verde`) ni labels de navegación interna.
- No cambio el `<title>` global de `index.html` (sigue siendo el de la home).
- No toco descripciones meta ni canonicals.
