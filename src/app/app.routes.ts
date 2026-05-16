import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
      { path: 'incoming', loadComponent: () => import('./pages/incoming/incoming.component').then(m => m.IncomingComponent) },
      { path: 'outgoing', loadComponent: () => import('./pages/outgoing/outgoing.component').then(m => m.OutgoingComponent) },
      { path: 'suppliers', loadComponent: () => import('./pages/suppliers/suppliers.component').then(m => m.SuppliersComponent) },
      { path: 'marketplaces', loadComponent: () => import('./pages/marketplaces/marketplaces.component').then(m => m.MarketplacesComponent) },
      { path: 'returns', loadComponent: () => import('./pages/returns/returns.component').then(m => m.ReturnsComponent) },
      { path: 'audit', loadComponent: () => import('./pages/audit/audit.component').then(m => m.AuditComponent) },
      { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent) },
      { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) },
      { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
