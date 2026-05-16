import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly tiles = [
    { label: 'Total Stock', val: '24,812', delta: '+4.2%', up: true, icon: 'box', color: 'purple' },
    { label: 'Incoming (30d)', val: '3,148', delta: '+12.4%', up: true, icon: 'inbox', color: 'green' },
    { label: 'Online Sales', val: 'Rp 312M', delta: '+8.1%', up: true, icon: 'shop', color: 'pink' },
    { label: 'Returns', val: '142', delta: '−2.3%', up: false, icon: 'rotate', color: 'coral' },
  ];

  readonly recents = [
    { kind: 'About Page', label: 'New product — Aurelia Field Jacket', time: '11:32', who: 'May Padilla', tag: 'Inventory', color: 'purple', icon: 'box' },
    { kind: 'Category', label: 'Category<Templates> updated', time: '11:20', who: 'Erik Pitman', tag: 'Categories', color: 'yellow', icon: 'tag' },
    { kind: 'Receipt', label: 'GR-2026-0148 from Northwind', time: '11:32', who: 'Erik Pitman', tag: 'Incoming', color: 'green', icon: 'inbox' },
    { kind: 'New User', label: 'Lucinda Wills joined as Sales Staff', time: '11:32', who: 'Alesia K.', tag: 'Users', color: 'coral', icon: 'users' },
  ];

  readonly donuts = [
    { label: 'Stock Value', pct: 50, val: 'Rp 1.2B', color: '#4f46e5' },
    { label: 'Online Sales', pct: 85, val: 'Rp 312M', color: '#dc2626' },
    { label: 'Pending Orders', pct: 70, val: '1,345', color: '#d97706' },
    { label: 'Returns Rate', pct: 12, val: '1.8%', color: '#db2777' },
  ];

  readonly seriesPoints: [number, number][];

  constructor(public data: DataService, private router: Router) {
    // Pre-compute area chart points
    const series = data.userStatSeries;
    const W = 760, H = 280;
    const pad = { l: 36, r: 16, t: 20, b: 28 };
    const max = Math.max(...series) * 1.1;
    const stepX = (W - pad.l - pad.r) / (series.length - 1);
    this.seriesPoints = series.map((v, i): [number, number] => [
      pad.l + i * stepX,
      pad.t + (1 - v / max) * (H - pad.t - pad.b),
    ]);
  }

  get areaPath(): string {
    const pts = this.seriesPoints;
    const H = 280, pad = { t: 20, b: 28 };
    const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
    return `${line} L${pts[pts.length-1][0]},${H - pad.b} L${pts[0][0]},${H - pad.b} Z`;
  }

  get linePath(): string {
    return this.seriesPoints.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  }

  get totalMarketRevenue(): number {
    return this.data.marketplaces.reduce((a, b) => a + b.revenue, 0);
  }

  marketShare(revenue: number): number {
    return Math.round(revenue / this.totalMarketRevenue * 100);
  }

  get lowStock() {
    return this.data.products.filter(p => p.stock < p.min).slice(0, 5);
  }

  navigate(path: string) { this.router.navigate([path]); }
}
