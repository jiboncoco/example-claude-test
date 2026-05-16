import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-outgoing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outgoing.component.html',
})
export class OutgoingComponent {
  activeTab = signal<'online'|'offline'|'returns'|'damaged'>('online');

  constructor(public data: DataService) {}

  orderStatusClass(s: string): string {
    if (s === 'shipped') return 'pill pill-green';
    if (s === 'packed') return 'pill pill-blue';
    if (s === 'pending') return 'pill pill-yellow';
    if (s === 'cancelled') return 'pill pill-coral';
    return 'pill pill-gray';
  }

  returnStatusClass(s: string): string {
    if (s === 'approved') return 'pill pill-green';
    if (s === 'completed') return 'pill pill-purple';
    if (s === 'pending') return 'pill pill-yellow';
    if (s === 'rejected') return 'pill pill-coral';
    if (s === 'returned') return 'pill pill-blue';
    return 'pill pill-gray';
  }

  paymentClass(s: string): string {
    if (s === 'paid') return 'pill pill-green';
    if (s === 'pending') return 'pill pill-yellow';
    if (s === 'refunded') return 'pill pill-coral';
    return 'pill pill-gray';
  }

  totalOnline(): number { return this.data.onlineOrders.reduce((a, b) => a + b.value, 0); }
  totalOffline(): number { return this.data.offlineSales.reduce((a, b) => a + b.value, 0); }
  totalSupplierReturns(): number { return this.data.supplierReturns.reduce((a, b) => a + b.value, 0); }
  totalDamaged(): number { return this.data.damagedGoods.reduce((a, b) => a + b.value, 0); }
}
