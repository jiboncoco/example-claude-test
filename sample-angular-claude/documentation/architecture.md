# Architecture

## Project Structure

```
sample-angular-claude/
├── src/
│   ├── app/
│   │   ├── app.ts                  # Root component
│   │   ├── app.html                # Root template (header + router outlet)
│   │   ├── app.css                 # Header and theme-toggle styles
│   │   ├── app.config.ts           # Browser application config (providers)
│   │   ├── app.config.server.ts    # SSR application config
│   │   ├── app.routes.ts           # Route definitions
│   │   ├── app.routes.server.ts    # SSR route definitions
│   │   ├── app.spec.ts             # Root component unit tests
│   │   └── theme.service.ts        # Dark/light mode service
│   ├── index.html                  # Shell HTML (anti-flash script lives here)
│   ├── main.ts                     # Browser bootstrap entry point
│   ├── main.server.ts              # SSR bootstrap entry point
│   ├── server.ts                   # Express server for SSR
│   └── styles.css                  # Global Tailwind import + root dark styles
├── docs/
│   ├── screenshot-light.png
│   └── screenshot-dark.png
├── documentation/                  # This folder — developer docs
├── public/                         # Static assets served as-is
├── angular.json                    # Angular CLI workspace config
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .postcssrc.json                 # PostCSS config (Tailwind v4 plugin)
└── .prettierrc
```

## Rendering Strategy

The app uses **Angular SSR** (`outputMode: "server"`) with full server-side rendering on every request. The Express entry point at `src/server.ts` handles requests; Angular generates the initial HTML on the server and the client re-hydrates using **Event Replay** (`withEventReplay()`), so user interactions before hydration are not lost.

## Module System

The project uses **standalone components** (no NgModules). The root `App` component declares its own imports (`RouterOutlet`). Providers are registered in `app.config.ts` via the functional `provideRouter` / `provideClientHydration` APIs.

## Styling Approach

| Concern | Solution |
|---|---|
| Global resets / base styles | `src/styles.css` (Tailwind v4 `@import "tailwindcss"`) |
| Component-scoped styles | Inline `<style>` in `app.html` + `app.css` external sheet |
| Theming | CSS custom properties (`--bg`, `--surface`, `--gray-*`) scoped with `:host-context(html.dark)` |
| Color space | `oklch` — perceptually uniform, consistent contrast in both modes |

## State Management

There is no external state management library. The single piece of shared UI state (the current theme) lives in `ThemeService` as an Angular `signal`, making it reactive and compatible with the Signals-based change detection pipeline.
