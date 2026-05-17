# Components

## App (Root Component)

**File:** `src/app/app.ts`  
**Selector:** `app-root`

The root component of the application. It injects `ThemeService` and exposes it to the template for the header toggle button.

### Class

```typescript
export class App {
  protected readonly title = signal('sample-angular-claude');
  protected readonly theme = inject(ThemeService);
}
```

| Member | Type | Description |
|---|---|---|
| `title` | `Signal<string>` | App title displayed in the welcome heading |
| `theme` | `ThemeService` | Injected theme service; drives the header toggle |

### Template Structure

```
<header class="app-header">
  └── <div class="header-inner">
        ├── <span class="header-brand">  — "Angular" brand label
        └── <button class="theme-toggle">  — dark/light switch
              ├── sun SVG icon
              ├── <div class="toggle-track">  — pill background
              │     └── <div class="toggle-thumb">  — sliding circle
              └── moon SVG icon

<main class="main">
  └── <div class="content">
        ├── <div class="left-side">
        │     ├── Angular logo SVG
        │     ├── <h1> — greeting with interpolated title()
        │     └── <p> — congratulations message
        ├── <div class="divider">
        └── <div class="right-side">
              ├── <div class="pill-group">  — resource links
              └── <div class="social-links">  — GitHub / X / YouTube

<router-outlet />
```

### CSS Classes (app.css)

| Class | Description |
|---|---|
| `.app-header` | Full-width sticky header bar (`3.25rem` tall) |
| `.header-inner` | Centered inner wrapper, max-width `1200px` |
| `.header-brand` | Bold brand text on the left |
| `.theme-toggle` | Icon + pill button, hover background on `:hover` |
| `.toggle-track` | Pill-shaped toggle background; `.is-dark` turns it violet |
| `.toggle-thumb` | White circle that slides right in dark mode |

### Responsive Behavior

At `max-width: 650px` the `.content` flex layout switches from row to column and the vertical divider becomes a horizontal gradient bar.

## Router Outlet

The `<router-outlet />` at the bottom of `app.html` renders child routes. Currently `app.routes.ts` defines no routes, so only the root template is displayed.
