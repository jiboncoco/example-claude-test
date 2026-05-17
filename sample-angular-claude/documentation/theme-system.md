# Theme System

The app ships with a fully functional dark/light mode system requiring zero third-party libraries beyond Angular and Tailwind CSS.

## How It Works

```
User clicks toggle
       │
       ▼
ThemeService.toggle()
       │
       ├─► Flips isDark signal
       ├─► Adds/removes "dark" class on <html>
       └─► Writes "dark" | "light" to localStorage
```

On the next page load, before Angular bootstraps, an inline script in `index.html` reads `localStorage` and applies the `dark` class instantly — preventing any flash of the wrong theme.

## ThemeService (`src/app/theme.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(false);

  constructor() {
    // Priority: localStorage > OS preference > light
    const saved = localStorage.getItem('theme');
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDark(saved === 'dark' || (!saved && prefersDark));
  }

  toggle() { this.setDark(!this.isDark()); }

  private setDark(dark: boolean) {
    this.isDark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
}
```

### Preference Resolution Order

1. Explicit user choice stored in `localStorage` (`"dark"` or `"light"`)
2. OS-level preference via `prefers-color-scheme: dark`
3. Default: **light** mode

## CSS Custom Properties

Theming is done via CSS custom properties that change value under `html.dark`. Component styles use `:host-context(html.dark)` to scope overrides.

### Light palette (default)

| Property | Value | Usage |
|---|---|---|
| `--bg` | `oklch(100% 0 0)` | Page background |
| `--surface` | `oklch(98% 0.004 300)` | Card / header surface |
| `--gray-900` | `oklch(19.37% 0.006 300.98)` | Headings |
| `--gray-700` | `oklch(36.98% 0.014 302.71)` | Body text |
| `--gray-400` | `oklch(70.9% 0.015 304.04)` | Muted / icon fills |

### Dark palette overrides (`html.dark`)

| Property | Value |
|---|---|
| `--bg` | `oklch(14% 0.012 280)` |
| `--surface` | `oklch(18% 0.012 280)` |
| `--gray-900` | `oklch(93% 0.004 300.98)` |
| `--gray-700` | `oklch(76% 0.010 302.71)` |
| `--gray-400` | `oklch(52% 0.010 304.04)` |

## Anti-Flash Script

The following inline script in `src/index.html` applies the saved theme before the first paint, preventing a flash of the wrong color:

```html
<script>
  (function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

## Toggle Button

The toggle button in the header (`app.html`) binds to `ThemeService`:

```html
<button
  class="theme-toggle"
  (click)="theme.toggle()"
  [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
>
  <!-- sun icon -->
  <div class="toggle-track" [class.is-dark]="theme.isDark()">
    <div class="toggle-thumb"></div>
  </div>
  <!-- moon icon -->
</button>
```

The `is-dark` class on `.toggle-track` slides the thumb via `transform: translateX(1.25rem)` using pure CSS transitions — no JavaScript animation logic required.

## Transitions

All color transitions use `transition: background-color 0.25s ease, color 0.25s ease` so the switch between modes is smooth rather than jarring.
