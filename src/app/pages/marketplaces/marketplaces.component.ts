import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-marketplaces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplaces.component.html',
})
export class MarketplacesComponent {
  constructor(public data: DataService) {}

  get totalRevenue(): number { return this.data.marketplaces.reduce((a, b) => a + b.revenue, 0); }
  get totalOrders(): number { return this.data.marketplaces.reduce((a, b) => a + b.orders, 0); }

  share(revenue: number): number {
    return Math.round(revenue / this.totalRevenue * 100);
  }
}
