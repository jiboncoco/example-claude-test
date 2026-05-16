import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.component.html',
})
export class AuditComponent {
  readonly entries = [
    { id: 'AL-001', user: 'Alesia Karpova', action: 'Updated product', module: 'Inventory', detail: 'Adjusted stock: Northwind Earbuds Pro +24', time: '2026-05-09 11:32', ip: '192.168.1.10' },
    { id: 'AL-002', user: 'Erik Pitman', action: 'Created receipt', module: 'Incoming', detail: 'GR-2026-0148 from Northwind Distribution', time: '2026-05-09 10:48', ip: '192.168.1.22' },
    { id: 'AL-003', user: 'Tahsan Khan', action: 'Created sale', module: 'Outgoing', detail: 'SO-26-018421 — Shopee order Rp 487K', time: '2026-05-09 09:55', ip: '192.168.1.31' },
    { id: 'AL-004', user: 'Alesia Karpova', action: 'Invited user', module: 'Users', detail: 'Lucinda Wills added as Sales Staff', time: '2026-05-09 09:12', ip: '192.168.1.10' },
    { id: 'AL-005', user: 'Sanika Suny', action: 'Approved return', module: 'Returns', detail: 'RC-26-00141 — Aurelia Cotton Crew Tee', time: '2026-05-08 16:40', ip: '192.168.1.18' },
    { id: 'AL-006', user: 'Bess Alkins', action: 'POS transaction', module: 'Outgoing', detail: 'POS-26-002841 — Rp 412K cash', time: '2026-05-08 15:02', ip: '192.168.1.45' },
    { id: 'AL-007', user: 'May Padilla', action: 'Updated product', module: 'Inventory', detail: 'Added Aurelia Field Jacket to inventory', time: '2026-05-08 11:20', ip: '192.168.1.12' },
    { id: 'AL-008', user: 'Cardi Bautista', action: 'Exported report', module: 'Reports', detail: 'Stock Report — May 2026', time: '2026-05-08 09:00', ip: '192.168.1.8' },
  ];

  moduleClass(m: string): string {
    const map: Record<string, string> = {
      'Inventory': 'pill pill-purple', 'Incoming': 'pill pill-green',
      'Outgoing': 'pill pill-coral', 'Users': 'pill pill-blue',
      'Returns': 'pill pill-yellow', 'Reports': 'pill pill-pink',
    };
    return map[m] || 'pill pill-gray';
  }

  constructor(public data: DataService) {}

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
