import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Supplier } from '../../services/data.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent {
  search = signal('');
  view = signal<'grid'|'list'>('grid');
  openSupplier = signal<Supplier | null>(null);
  showAddModal = signal(false);

  constructor(public data: DataService) {}

  get filtered() {
    const s = this.search().toLowerCase();
    return this.data.suppliers.filter(sup =>
      !s || `${sup.name} ${sup.city} ${sup.contact}`.toLowerCase().includes(s)
    );
  }

  get totalProducts() { return this.data.suppliers.reduce((a, b) => a + b.products, 0); }
  get avgOnTime() { return Math.round(this.data.suppliers.reduce((a, b) => a + b.ontime, 0) / this.data.suppliers.length); }
  get openReturns() {
    return this.data.supplierReturns.filter(r => r.status === 'pending').length +
      this.data.damagedGoods.filter(r => r.status === 'pending').length;
  }

  colorFor(id: string): string {
    const colors = ['purple','coral','blue','green','yellow','pink'];
    const idx = parseInt(id.split('-')[1] || '0', 10);
    return colors[idx % colors.length];
  }

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('');
  }

  ontimeClass(pct: number): string {
    if (pct >= 92) return 'pill pill-green';
    if (pct >= 88) return 'pill pill-yellow';
    return 'pill pill-coral';
  }

  ontimeColor(pct: number): string {
    if (pct >= 92) return 'var(--accent-green)';
    if (pct >= 88) return 'var(--accent-yellow)';
    return 'var(--accent-coral)';
  }

  recentReceipts(name: string) {
    return this.data.incoming.filter(r => r.supplier === name).slice(0, 4);
  }

  productsFor(name: string) {
    return this.data.products.filter(p => p.supplier === name);
  }
}
