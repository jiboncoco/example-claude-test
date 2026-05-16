import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, IncomingReceipt } from '../../services/data.service';

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

  constructor(public data: DataService) {}

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

  totalValue(): number {
    return this.data.incoming.reduce((a, b) => a + b.value, 0);
  }

  totalQty(): number {
    return this.data.incoming.reduce((a, b) => a + b.qty, 0);
  }

  get receivedCount() { return this.data.incoming.filter(r => r.status === 'received').length; }
  get partialCount() { return this.data.incoming.filter(r => r.status === 'partial').length; }
  get pendingCount() { return this.data.incoming.filter(r => r.status === 'pending').length; }

  readonly statTiles = [
    { label: 'Total Receipts', color: 'purple' },
    { label: 'Received', color: 'green' },
    { label: 'Partial', color: 'blue' },
    { label: 'Pending QC', color: 'yellow' },
  ];
}
