import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

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

  constructor(public data: DataService) {}

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
    this.showNewModal.set(false);
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
