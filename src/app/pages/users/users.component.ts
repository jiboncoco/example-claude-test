import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  activeTab = signal<'users'|'roles'>('users');
  search = signal('');
  openUser = signal<User | null>(null);

  constructor(public data: DataService) {}

  get filteredUsers() {
    const s = this.search().toLowerCase();
    return this.data.users.filter(u => !s || `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(s));
  }

  get activeCount() { return this.data.users.filter(u => u.status === 'active').length; }

  avatarColor(color: string): string {
    const map: Record<string, string> = {
      purple: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      coral: 'linear-gradient(135deg, #dc2626, #ef4444)',
      yellow: 'linear-gradient(135deg, #d97706, #f59e0b)',
      green: 'linear-gradient(135deg, #16a34a, #22c55e)',
      blue: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      pink: 'linear-gradient(135deg, #db2777, #ec4899)',
    };
    return map[color] || 'var(--accent-purple)';
  }

  roleColor(role: string): string {
    const map: Record<string, string> = {
      'Super Admin': 'pill-purple', 'Manager': 'pill-pink',
      'Warehouse Staff': 'pill-coral', 'Sales Staff': 'pill-yellow', 'Finance Staff': 'pill-blue',
    };
    return 'pill ' + (map[role] || 'pill-gray');
  }

  badgeColor(badge: string): string {
    return 'pill pill-' + badge;
  }
}
