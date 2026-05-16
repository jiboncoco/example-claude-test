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

  statusClass(s: string): string {
    if (s === 'approved' || s === 'returned') return 'pill pill-green';
    if (s === 'completed') return 'pill pill-purple';
    if (s === 'pending') return 'pill pill-yellow';
    if (s === 'rejected') return 'pill pill-coral';
    return 'pill pill-gray';
  }
}
