# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (hot reload)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There are no test or lint commands configured.

## What This Project Is

**SmartGuide Predict** is a high-fidelity glucose monitoring app prototype (UI mockup) targeting Portuguese-speaking users (Brazilian Portuguese). It is a React SPA that renders a scaled iPhone frame in the browser — not a real medical app. All data is static and simulated; there is no backend, no API, and no persistence beyond `localStorage` for the light/dark theme preference.

## Architecture

### Data Flow

`src/data/states.js` is the single source of truth. It exports:
- `STATES` — a map of 5 glucose scenario keys (`normal`, `rising`, `high`, `lowSoon`, `low`) to display data (current reading, trend, forecast, mascot mood, statistics, risk object).
- `generateCurve(stateKey)` — deterministic pseudo-random chart data for the given state.

`stateKey` is owned in `App.jsx` and passed down to all screens. The **TweaksPanel** (developer overlay) lets you switch `stateKey`, active tab, and theme interactively without editing code.

### Navigation Model

Tab navigation (`home` | `patterns` | `alerts` | `more`) is managed by a `tab` string in `App.jsx`. There is no router. The `MoreScreen` manages its own sub-navigation via a local `subview` state string — it renders sub-screens directly in place, not in a sheet.

Data-entry forms (Meal, Insulin, Activity) open inside a `BottomSheet` overlay controlled by `registerSheet` state in `App.jsx`. The bottom-nav center `+` button opens a `RegisterMenu` picker first, which then transitions to the specific form.

### Theming

`src/theme/themes.js` defines two complete token sets (`dark`, `light`). `ThemeProvider` wraps the entire app and exposes `{ T, mode, toggle }` via `useTheme()`. Every component calls `const { T } = useTheme()` and references tokens like `T.bg`, `T.textHi`, `T.ok`, `T.warn`, `T.danger`, etc.

**All styling is done with inline styles using `T.*` tokens — no CSS modules, no Tailwind, no styled-components.** The only global CSS lives in `index.html` (body layout, `sg-scroll` class for hidden scrollbars, `button:active` scale).

### Key Conventions

- **Inline styles everywhere.** Use `T.*` for all colors. Background/surface hierarchy: `T.bg` → `T.bg2` (cards) → `T.bg3` (inputs/chips). Use `T.line` / `T.line2` for borders.
- **Tone system.** Contextual severity uses `tone` strings: `'ok'` → `T.ok`, `'warn'` → `T.warn`, `'danger'` → `T.danger`. The `STATES[stateKey].tone` drives the color of the main reading and chart.
- **`sg-scroll` class** must be applied to any scrollable div to hide the scrollbar (defined globally in `index.html`).
- **Data-entry screens** receive `{ onClose, onSave }` props. `onClose` dismisses the sheet; `onSave` currently does nothing but receives the form payload.
- **No routing library.** New top-level screens belong in `MoreScreen`'s `subview` map or as new tabs in `App.jsx`. New data-entry forms belong in the `BottomSheet` in `App.jsx` with a new `registerSheet.type`.

### Special Components

- **`Icon`** (`src/icons/Icon.jsx`) — all icons are inline SVG paths. Add new icons here rather than importing an icon library.
- **`Bee`** — the mascot. It is a sprite sheet (`public/bee-sprite.png`, 5×3 grid). Add new moods by mapping a mood name to `[col, row]` in the `POS` object. `mood` is driven by `STATES[stateKey].mascotMood`.
- **`GlucoseChart`** — a custom SVG chart. The `echarts` package is installed but not used anywhere in the codebase.
- **`TweaksPanel`** — developer overlay, accessible via the "⚙ Tweaks" button below the device frame. Also togglable via `postMessage` (`__activate_edit_mode` / `__deactivate_edit_mode`) for embedding in design tools.

### iOS Device Frame

`src/frame/IOSDevice.jsx` wraps all screens in a 430×932 iPhone shell (Dynamic Island, home indicator). `App.jsx` auto-scales this frame to fit the viewport using a `scale` transform. All screen content must assume fixed device dimensions — do not use viewport units inside the frame.
