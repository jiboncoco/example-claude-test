import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  msg: string;
  variant?: 'success' | 'info' | 'warn' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  push(msg: string, variant: Toast['variant'] = 'success') {
    const id = Math.random().toString(36).slice(2);
    this.toasts.update(t => [...t, { id, msg, variant }]);
    setTimeout(() => this.dismiss(id), 2800);
  }

  dismiss(id: string) {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }
}
