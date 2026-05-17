# Services

## ThemeService

**File:** `src/app/theme.service.ts`  
**Provided in:** `root` (singleton)

Manages the application's dark/light theme. Reads and writes `localStorage`, applies a CSS class to `<html>`, and exposes a reactive `Signal` so templates update automatically.

### API

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark: Signal<boolean>;
  toggle(): void;
}
```

#### `isDark`

`Signal<boolean>` — `true` when dark mode is active. Read this in templates or computed signals:

```html
<!-- template -->
[class.is-dark]="theme.isDark()"
```

```typescript
// in a component
protected readonly theme = inject(ThemeService);
const label = computed(() => theme.isDark() ? 'Light mode' : 'Dark mode');
```

#### `toggle()`

Flips the current theme:

```typescript
theme.toggle();
```

Internally calls the private `setDark(!this.isDark())` which:
1. Updates the `isDark` signal
2. Adds or removes the `dark` class on `document.documentElement`
3. Persists the choice via `localStorage.setItem('theme', ...)`

### Initialization Logic

On construction, the service determines the initial theme in this order:

```
localStorage.getItem('theme') === 'dark'   → dark mode
localStorage.getItem('theme') === 'light'  → light mode
matchMedia('prefers-color-scheme: dark')   → dark mode if OS prefers dark
(fallback)                                 → light mode
```

### SSR Compatibility

`ThemeService` accesses browser APIs (`localStorage`, `matchMedia`) via Angular's `DOCUMENT` injection token and `defaultView`. On the server these resolve to `null`, so all accesses are guarded with optional chaining (`?.`), preventing SSR crashes.
