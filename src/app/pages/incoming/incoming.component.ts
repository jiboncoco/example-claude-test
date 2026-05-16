import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, IncomingReceipt } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-incoming',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incoming.component.html',
})
export class IncomingComponent {
  search = signal('');
  statusFilter = signal('all');
  openReceipt = signal<IncomingReceipt | null>(null);
  showNewModal = signal(false);

  newForm = { supplier: 'Northwind Distribution', date: '', items: '', qty: '', value: '', notes: '' };

  private toast = inject(ToastService);

  constructor(public data: DataService) {
    this.newForm.date = new Date().toISOString().slice(0, 10);
  }

  get newValid(): boolean {
    return !!(this.newForm.supplier && this.newForm.date && this.newForm.items && this.newForm.qty);
  }

  get filtered() {
    const s = this.search().toLowerCase();
    const st = this.statusFilter();
    return this.data.incoming.filter(r => {
      if (st !== 'all' && r.status !== st) return false;
      if (s && !`${r.id} ${r.supplier}`.toLowerCase().includes(s)) return false;
      return true;
    });
  }

  statusClass(s: string): string {
    if (s === 'received') return 'pill pill-green';
    if (s === 'pending') return 'pill pill-yellow';
    if (s === 'partial') return 'pill pill-blue';
    return 'pill pill-gray';
  }

  totalValue(): number { return this.data.incoming.reduce((a, b) => a + b.value, 0); }

  get receivedCount() { return this.data.incoming.filter(r => r.status === 'received').length; }
  get partialCount() { return this.data.incoming.filter(r => r.status === 'partial').length; }
  get pendingCount() { return this.data.incoming.filter(r => r.status === 'pending').length; }
  get totalItemsReceived() { return this.data.incoming.reduce((a, b) => a + b.qty, 0); }

  openNew() {
    this.newForm = { supplier: 'Northwind Distribution', date: new Date().toISOString().slice(0, 10), items: '', qty: '', value: '', notes: '' };
    this.showNewModal.set(true);
  }

  saveReceipt() {
    if (!this.newValid) return;
    const num = String(this.data.incoming.length + 149).padStart(4, '0');
    const id = `GR-2026-${num}`;
    this.data.incoming.unshift({
      id,
      supplier: this.newForm.supplier,
      items: +this.newForm.items || 0,
      qty: +this.newForm.qty || 0,
      value: +this.newForm.value || 0,
      date: this.newForm.date,
      status: 'pending',
      notes: this.newForm.notes,
    });
    this.showNewModal.set(false);
    this.toast.push(`Receipt ${id} created — awaiting QC`);
  }
}
