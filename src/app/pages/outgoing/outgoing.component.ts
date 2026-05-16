import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

interface LineItem { product: string; qty: string; price: string; }

@Component({
  selector: 'app-outgoing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outgoing.component.html',
})
export class OutgoingComponent {
  activeTab = signal<'online'|'offline'|'returns'|'damaged'>('online');
  showNewModal = signal(false);

  txType = signal<'online'|'offline'|'return'|'damaged'>('online');
  txDate = new Date().toISOString().slice(0, 10);
  txMarketplace = 'shopee';
  txCustomer = '';
  txCashier = 'Bess A.';
  txPayment = 'cash';
  txSupplier = 'Northwind Distribution';
  txNotes = '';
  txLines: LineItem[] = [{ product: '', qty: '', price: '' }];

  readonly txTypes = [
    { id: 'online', label: 'Online sale', color: 'pink', hint: 'Marketplace order', icon: 'shop' },
    { id: 'offline', label: 'Offline sale (POS)', color: 'yellow', hint: 'In-store counter', icon: 'cash' },
    { id: 'return', label: 'Return to supplier', color: 'blue', hint: 'Send stock back', icon: 'rotate' },
    { id: 'damaged', label: 'Damaged write-off', color: 'coral', hint: 'Remove from stock', icon: 'warn' },
  ] as const;

  private toast = inject(ToastService);

  constructor(public data: DataService) {}

  get txValid(): boolean {
    const hasItems = this.txLines.some(l => l.product && +l.qty > 0);
    if (!hasItems) return false;
    const type = this.txType();
    if (type === 'online') return !!this.txCustomer;
    if (type === 'offline') return !!this.txCashier;
    return !!this.txSupplier;
  }

  private nextSeq(prefix: string): string {
    const base = 18421 + this.data.onlineOrders.length;
    return `${prefix}-${String(base).slice(0, 2)}-${String(base).padStart(6, '0').slice(-6)}`;
  }

  totalOnline(): number { return this.data.onlineOrders.reduce((a, b) => a + b.value, 0); }
  totalOffline(): number { return this.data.offlineSales.reduce((a, b) => a + b.value, 0); }
  totalSupplierReturns(): number { return this.data.supplierReturns.reduce((a, b) => a + b.value, 0); }
  totalDamaged(): number { return this.data.damagedGoods.reduce((a, b) => a + b.value, 0); }

  get txTotal(): number {
    return this.txLines.reduce((a, l) => a + ((+l.qty || 0) * (+l.price || 0)), 0);
  }

  addLine() { this.txLines = [...this.txLines, { product: '', qty: '', price: '' }]; }
  removeLine(i: number) { this.txLines = this.txLines.filter((_, idx) => idx !== i); }

  openNew() {
    this.txLines = [{ product: '', qty: '', price: '' }];
    this.txCustomer = '';
    this.txNotes = '';
    this.showNewModal.set(true);
  }

  saveTx() {
    if (!this.txValid) return;
    const type = this.txType();
    const totalQty = this.txLines.reduce((a, l) => a + (+l.qty || 0), 0);
    const total = this.txTotal;
    const dateTime = `${this.txDate} ${new Date().toTimeString().slice(0, 5)}`;
    let id = '';

    if (type === 'online') {
      id = `SO-26-${String(18422 + this.data.onlineOrders.length).padStart(6, '0')}`;
      this.data.onlineOrders.unshift({
        id, marketplace: this.txMarketplace, customer: this.txCustomer,
        items: this.txLines.length, qty: totalQty, value: total,
        date: dateTime, status: 'pending', payment: this.txPayment,
      });
      this.activeTab.set('online');
    } else if (type === 'offline') {
      id = `POS-26-${String(2842 + this.data.offlineSales.length).padStart(6, '0')}`;
      this.data.offlineSales.unshift({
        id, cashier: this.txCashier,
        items: this.txLines.length, qty: totalQty, value: total,
        date: dateTime, payment: this.txPayment,
      });
      this.activeTab.set('offline');
    } else if (type === 'return') {
      id = `RS-26-${String(89 + this.data.supplierReturns.length).padStart(5, '0')}`;
      this.data.supplierReturns.unshift({
        id, supplier: this.txSupplier, reason: this.txNotes || 'Return to supplier',
        items: this.txLines.length, qty: totalQty, value: total,
        date: this.txDate, status: 'pending',
      });
      this.activeTab.set('returns');
    } else if (type === 'damaged') {
      id = `DG-26-${String(215 + this.data.damagedGoods.length).padStart(5, '0')}`;
      this.data.damagedGoods.unshift({
        id, supplier: this.txSupplier, reason: this.txNotes || 'Damaged write-off',
        items: this.txLines.length, qty: totalQty, value: total,
        date: this.txDate, status: 'pending',
      });
      this.activeTab.set('damaged');
    }

    this.showNewModal.set(false);
    this.toast.push(`${id} created — ${this.data.formatIDR(total)}`);
  }

  orderStatusClass(s: string): string {
    const m: Record<string, string> = { shipped: 'pill-green', packed: 'pill-blue', pending: 'pill-yellow', cancelled: 'pill-coral' };
    return 'pill ' + (m[s] || 'pill-gray');
  }

  returnStatusClass(s: string): string {
    const m: Record<string, string> = { approved: 'pill-green', completed: 'pill-purple', pending: 'pill-yellow', rejected: 'pill-coral', returned: 'pill-blue' };
    return 'pill ' + (m[s] || 'pill-gray');
  }

  paymentClass(s: string): string {
    const m: Record<string, string> = { paid: 'pill-green', pending: 'pill-yellow', refunded: 'pill-gray' };
    return 'pill ' + (m[s] || 'pill-gray');
  }

  formatIDR(n: number): string { return this.data.formatIDR(n); }
}
