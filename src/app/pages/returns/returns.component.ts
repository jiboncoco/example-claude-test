import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './returns.component.html',
})
export class ReturnsComponent {
  activeTab = signal<'customer'|'supplier'|'damaged'>('customer');
  constructor(public data: DataService) {}

  get totalCustomer(): number { return this.data.customerReturns.reduce((a, b) => a + b.value, 0); }
  get totalSupplier(): number { return this.data.supplierReturns.reduce((a, b) => a + b.value, 0); }
  get totalDamaged(): number { return this.data.damagedGoods.reduce((a, b) => a + b.value, 0); }
  get pendingCustomer(): number { return this.data.customerReturns.filter(r => r.status === 'pending').length; }

  statusClass(s: string): string {
    if (s === 'approved' || s === 'returned') return 'pill pill-green';
    if (s === 'completed') return 'pill pill-purple';
    if (s === 'pending') return 'pill pill-yellow';
    if (s === 'rejected') return 'pill pill-coral';
    return 'pill pill-gray';
  }
}
