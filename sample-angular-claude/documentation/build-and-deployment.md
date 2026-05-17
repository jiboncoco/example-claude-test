# Build & Deployment

## Build Configurations

The Angular CLI workspace (`angular.json`) defines two build configurations.

### Production (default)

```bash
ng build
```

Outputs to `dist/sample-angular-claude/`. Optimizations enabled:

| Setting | Value |
|---|---|
| Output hashing | `all` (cache-busting filenames) |
| Optimization | Yes (tree-shaking, minification) |
| Source maps | No |
| Initial bundle warning | 500 kB |
| Initial bundle error | 1 MB |
| Component style warning | 4 kB |
| Component style error | 8 kB |

### Development

```bash
ng build --configuration development
# or watch mode:
npm run watch
```

| Setting | Value |
|---|---|
| Optimization | Disabled |
| Source maps | Enabled |
| License extraction | Disabled |

## Output Structure

After `ng build` the `dist/` directory contains:

```
dist/sample-angular-claude/
├── browser/          # Static assets served to clients
│   ├── index.html
│   ├── main-<hash>.js
│   └── ...
└── server/
    └── server.mjs    # Express SSR entry point
```

## Server-Side Rendering

The app uses Angular SSR with Express 5. After building, serve it with:

```bash
npm run serve:ssr:sample-angular-claude
# expands to:
node dist/sample-angular-claude/server/server.mjs
```

The server listens on `PORT` (environment variable) or `4000` by default.

### SSR Entry Points

| File | Purpose |
|---|---|
| `src/main.ts` | Browser bootstrap (`bootstrapApplication`) |
| `src/main.server.ts` | Server bootstrap for Angular SSR |
| `src/server.ts` | Express app — handles static files + SSR rendering |
| `src/app/app.config.server.ts` | SSR-specific providers merged with the base config |

## Testing

### Unit Tests

```bash
ng test
```

Runs tests with **Vitest**. Test files follow the `*.spec.ts` naming convention. The root `app.spec.ts` contains a basic smoke test for the `App` component.

### End-to-End Tests

```bash
ng e2e
```

No e2e runner is pre-configured. Add Playwright or Cypress and register it as a builder in `angular.json` to enable this command.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | Port for the SSR Express server |

## Deployment Checklist

1. Run `ng build` (production config is the default)
2. Copy the `dist/` folder to your server
3. Ensure Node.js 20+ is available
4. Start the server: `node dist/sample-angular-claude/server/server.mjs`
5. Optionally place a reverse proxy (nginx, Caddy) in front on port 80/443

## Static Hosting (SPA mode)

If SSR is not required, build with `outputMode: "static"` in `angular.json` and serve the `dist/browser/` folder from any static host (Netlify, Vercel, S3, GitHub Pages). The anti-flash theme script in `index.html` still works in this mode.
