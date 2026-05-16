import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  search = signal('');
  cat = signal('all');
  status = signal('all');
  sortKey = signal('name');
  sortDir = signal<'asc'|'desc'>('asc');
  page = signal(1);
  openProduct = signal<Product | null>(null);
  showAddModal = signal(false);
  readonly PAGE = 8;

  readonly filtered = computed(() => {
    const s = this.search().toLowerCase();
    const c = this.cat();
    const st = this.status();
    let r = this.data.products.filter(p => {
      if (c !== 'all' && p.category !== c) return false;
      if (st === 'low' && p.stock >= p.min) return false;
      if (st === 'out' && p.stock !== 0) return false;
      if (st === 'inactive' && p.status !== 'inactive') return false;
      if (s && !`${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(s)) return false;
      return true;
    });
    const k = this.sortKey() as keyof Product;
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    r.sort((a, b) => {
      const av = a[k], bv = b[k];
      if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * dir;
      return ((av as number) - (bv as number)) * dir;
    });
    return r;
  });

  readonly slice = computed(() => {
    const p = this.page();
    return this.filtered().slice((p - 1) * this.PAGE, p * this.PAGE);
  });

  readonly pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.PAGE)));

  readonly pageNums = computed(() => {
    const total = this.pages();
    const cur = this.page();
    const nums: (number|string)[] = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || Math.abs(i - cur) <= 1) nums.push(i);
      else if (nums[nums.length - 1] !== '…') nums.push('…');
    }
    return nums;
  });

  get totalStock() { return this.data.products.length; }
  get inStock() { return this.data.products.filter(p => p.stock > 0).length; }
  get lowStock() { return this.data.products.filter(p => p.stock > 0 && p.stock < p.min).length; }
  get outStock() { return this.data.products.filter(p => p.stock === 0).length; }

  constructor(public data: DataService) {}

  toggleSort(key: string) {
    if (this.sortKey() === key) this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    else { this.sortKey.set(key); this.sortDir.set('asc'); }
    this.page.set(1);
  }

  sortArrow(key: string): string {
    if (this.sortKey() !== key) return '↕';
    return this.sortDir() === 'asc' ? '▲' : '▼';
  }

  isSorted(key: string) { return this.sortKey() === key; }

  stockClass(p: Product): string {
    if (p.stock === 0) return 'pill pill-coral';
    if (p.stock < p.min) return 'pill pill-yellow';
    return 'pill pill-green';
  }

  stockLabel(p: Product): string {
    if (p.stock === 0) return 'Out';
    if (p.stock < p.min) return 'Low';
    return 'OK';
  }

  setPage(n: number | string) {
    if (typeof n === 'number') this.page.set(n);
  }

  filterCat(c: string) { this.cat.set(c); this.page.set(1); }
  filterStatus(s: string) { this.status.set(s); this.page.set(1); }
  onSearch(v: string) { this.search.set(v); this.page.set(1); }
}
