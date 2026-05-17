import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly isDark = signal(false);

  constructor() {
    const win = this.doc.defaultView;
    const saved = win?.localStorage?.getItem('theme') ?? null;
    const prefersDark = win?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.setDark(saved === 'dark' || (!saved && prefersDark));
  }

  toggle() {
    this.setDark(!this.isDark());
  }

  private setDark(dark: boolean) {
    this.isDark.set(dark);
    this.doc.documentElement.classList.toggle('dark', dark);
    this.doc.defaultView?.localStorage?.setItem('theme', dark ? 'dark' : 'light');
  }
}
