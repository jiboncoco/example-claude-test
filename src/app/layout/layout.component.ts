import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  menuOpen = signal(false);
  userMenuOpen = signal(false);
  toasts = signal<{id: string; msg: string}[]>([]);

  readonly nav = [
    { path: '/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/inventory', label: 'Inventory', icon: 'box', badge: 'NEW' },
    { path: '/incoming', label: 'Incoming Goods', icon: 'inbox', count: 9 },
    { path: '/outgoing', label: 'Outgoing Goods', icon: 'truck', count: 23 },
    { path: '/reports', label: 'Reports', icon: 'chart' },
    { path: '/users', label: 'Users & Roles', icon: 'users' },
  ];

  readonly ops = [
    { path: '/suppliers', label: 'Suppliers', icon: 'building', count: 6 },
    { path: '/marketplaces', label: 'Marketplaces', icon: 'shop', count: 7 },
    { path: '/returns', label: 'Returns', icon: 'rotate', count: 14 },
    { path: '/audit', label: 'Audit Log', icon: 'flag' },
  ];

  constructor(public data: DataService, private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1024) this.menuOpen.set(false);
  }

  toggleMenu() { this.menuOpen.set(!this.menuOpen()); }
  toggleUserMenu() { this.userMenuOpen.set(!this.userMenuOpen()); }

  navigate(path: string) {
    this.menuOpen.set(false);
    this.userMenuOpen.set(false);
    this.router.navigate([path]);
  }

  logout() {
    this.userMenuOpen.set(false);
    this.router.navigate(['/login']);
  }

  getPageTitle(): string {
    const url = this.router.url.split('?')[0];
    const map: Record<string, string> = {
      '/dashboard': 'Dashboard', '/inventory': 'Inventory',
      '/incoming': 'Incoming Goods', '/outgoing': 'Outgoing Goods',
      '/reports': 'Reports', '/users': 'Users & Roles',
      '/suppliers': 'Suppliers', '/marketplaces': 'Marketplaces',
      '/returns': 'Returns', '/audit': 'Audit Log', '/profile': 'My profile',
    };
    return map[url] || 'WareSync';
  }

  pushToast(msg: string) {
    const id = Math.random().toString(36).slice(2);
    this.toasts.update(t => [...t, { id, msg }]);
    setTimeout(() => this.toasts.update(t => t.filter(x => x.id !== id)), 2800);
  }
}
