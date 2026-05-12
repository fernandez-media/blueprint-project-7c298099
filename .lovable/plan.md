# Codebase Cleanup — Removal Report

This is a **proposal only**. Nothing has been deleted. After you approve, I'll remove items in the order listed and run a build check. Zero visual/behavioral changes expected.

---

## 1) Unused component files (`src/components/`)

These are not imported anywhere in `src/` or `index.html`:

- `src/components/CybercoreBackground.tsx`
- `src/components/LocationCardInteractive.tsx`
- `src/components/NavLink.tsx`
- `src/components/ParallaxImage.tsx`
- `src/components/RouteLoader.tsx`
- `src/components/ShaderGrid.tsx`
- `src/components/VerticalBeams.tsx`

## 2) Unused page files (`src/pages/`)

- `src/pages/HuellaAzul.tsx` — route `/huella-azul` is wired to `MainLanding`, not this file
- `src/pages/Index.tsx` — never referenced; routing goes through `AnimatedRoutes`

## 3) Unused shadcn/ui primitives (`src/components/ui/`)

Not imported anywhere:

- `alert-dialog.tsx`, `alert.tsx`, `animated-gradient-border.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `calendar.tsx`, `carousel.tsx`, `chart.tsx`, `checkbox.tsx`, `collapsible.tsx`, `command.tsx`, `context-menu.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `expand-map.tsx`, `fade-text.tsx`, `form.tsx`, `gradient-dots.tsx`, `hover-card.tsx`, `input-otp.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `progress.tsx`, `pulse-beams.tsx`, `radio-group.tsx`, `resizable.tsx`, `scroll-area.tsx`, `select.tsx`, `shiny-button.tsx`, `sidebar.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`, `toggle-group.tsx`

Kept (in use): `accordion`, `button`, `card`, `dialog`, `dock`, `image-auto-slider`, `input`, `interactive-image-accordion`, `label`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`, `toast`, `toaster`, `toggle`, `tooltip`, `use-toast`, `word-rotate`.

## 4) Unused imports inside active files

- `src/pages/Home.tsx` line 9 — `import ProceduralBackgroundWhite from "@/components/ProceduralBackgroundWhite";` (only the import line exists, never rendered).
  - If confirmed unused → also delete `src/components/ProceduralBackgroundWhite.tsx`.

## 5) Unused assets

`src/assets/`:
- `blueprint-gym-desktop.jpg`
- `blueprint-gym.jpg`  *(only `blueprint-gym-hero.jpg` is used)*
- `gym-interior.jpg` *(in `public/`, see below — but this filename also exists in src? Confirmed only `public/gym-interior.jpg`)*
- `instagram-3d.png`
- `meet-the-chef.jpg`
- `reset-hero-bg.jpg`
- `accordion/accordion-founder.jpg`

`public/`:
- `gym-interior.jpg`
- `rotativo/chef-holographic.jpg`
- `rotativo/gym-holographic.jpg`
- `rotativo/project-blueprint.jpg`  *(entire `public/rotativo/` folder)*
- `footer-bg.jpeg`  *(only `footer-bg.webp` is referenced)*
- `placeholder.svg`  *(no references)*

## 6) Unused npm dependencies (tied to deleted ui primitives)

Each is imported by exactly one of the unused `ui/` files above and nowhere else:

- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-toggle-group`
- `embla-carousel-react` (carousel.tsx)
- `cmdk` (command.tsx)
- `input-otp` (input-otp.tsx)
- `react-day-picker` (calendar.tsx)
- `react-resizable-panels` (resizable.tsx)
- `recharts` (chart.tsx)
- `vaul` (drawer.tsx)

`react-hook-form` / `@hookform/resolvers` / `zod` are only used by `form.tsx` — safe to remove if `form.tsx` is removed and no future form work is planned. **Marked uncertain (see §8).**

## 7) Files explicitly kept (verified in use)

`MainLanding`, `Home`, `HuellaRoja`, `HuellaVerde`, `NotFound`, `AnimatedRoutes`, `BackToHomeButton`, `BentoGrid`, `BiometricScan`, `BiometricScanGreen`, `BiometricScanRed`, `BiometricTerminalLocation`, `ElectricBorder` (+ css), `FeatureCard`, `FingerprintHUDCard`, `Footer`, `FooterBackground`, `GradualBlur`, `HomeLoader`, `HuellaVerdeHUDFooter`, `LazyMount`, `PremiumServiceAccordion`, `PricingCardsHarshGlow`, `PricingSection`, `ProceduralBackground`, `ScrollToTop`, `SEO`, all hooks, `lib/utils`, `lib/scrollAnimations`, all `src/assets/slider/*`, all `public/about/*`, `public/accordion/*`, `public/blueprint-lab/*`, `public/hackbar/*`, `public/hackbar-card/*`, `public/videos/*`, `public/poster_image.jpg`, `footer-bg.webp`, both `hero-bg*.mp4`, etc.

## 8) Uncertain — please decide

- **`react-hook-form`, `@hookform/resolvers`, `zod`** — only consumed by `ui/form.tsx`. Remove if no upcoming form work.
- **`public/placeholder.svg`** — sometimes referenced as a fallback by image components; rg shows zero refs. Likely safe but you may want to keep it.
- **`src/assets/blueprint-gym.jpg`** — similar filename to the in-use `blueprint-gym-hero.jpg`; only the latter is imported. Confirming we can drop the bare `blueprint-gym.jpg`.
- **`src/components/ui/animated-gradient-border.tsx`** — relevant to a memory note about `@property` minification workaround. Currently has zero imports; safe to delete unless you want to keep it as a reference.

## 9) Removal order (after approval)

1. Remove the unused `import ProceduralBackgroundWhite` line in `src/pages/Home.tsx`.
2. Delete component/page/ui files in §1, §2, §3 (and `ProceduralBackgroundWhite.tsx`).
3. Delete asset files in §5.
4. `bun remove` the dependencies in §6 (and §8 if you confirm).
5. Run typecheck/build to verify zero broken imports.

## Notes / scope guardrails

- No edits to `index.html`, route config, ESLint/TS configs, README, or any actively-used file beyond the one-line import removal in Home.tsx.
- No styling, layout, or behavior changes.
- Build verification at the end; if anything fails, the offending file is restored and reported back.

**Please confirm (or strike items) and I'll proceed.**
