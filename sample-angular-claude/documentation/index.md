# sample-angular-claude — Documentation

An Angular 21 starter application with a full dark/light mode theme system built with Tailwind CSS v4 and Server-Side Rendering (SSR).

## Table of Contents

| Document | Description |
|---|---|
| [Getting Started](./getting-started.md) | Installation, prerequisites, and running the app |
| [Architecture](./architecture.md) | Project structure and architectural decisions |
| [Theme System](./theme-system.md) | Dark/light mode implementation in depth |
| [Components](./components.md) | Component API and template reference |
| [Services](./services.md) | `ThemeService` API reference |
| [Build & Deployment](./build-and-deployment.md) | Build configs, SSR, and production deployment |

## Quick Start

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Language | TypeScript 5.9 |
| SSR | Angular SSR (`@angular/ssr`) + Express 5 |
| Testing | Vitest |
| Package manager | npm 10 |
