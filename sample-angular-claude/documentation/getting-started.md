# Getting Started

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 20 or later |
| npm | 10 or later |
| Angular CLI | 21 (installed via `node_modules`) |

## Installation

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd sample-angular-claude
npm install
```

## Development Server

```bash
npm start
# or
ng serve
```

The app is available at [http://localhost:4200](http://localhost:4200). The server hot-reloads on any file change.

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `ng serve` | Starts the dev server with HMR |
| `build` | `ng build` | Production build with SSR |
| `watch` | `ng build --watch --configuration development` | Rebuilds on change (dev mode) |
| `test` | `ng test` | Runs unit tests with Vitest |
| `serve:ssr` | `node dist/sample-angular-claude/server/server.mjs` | Serves the SSR bundle locally |

## First Run

1. Run `npm install`
2. Run `npm start`
3. Open [http://localhost:4200](http://localhost:4200)
4. Use the toggle in the top-right header to switch between light and dark mode
5. Reload the page — your preference is persisted in `localStorage`
