import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, User } from '../../services/data.service';

interface InviteRow { email: string; name: string; role: string; }
interface EditForm { name: string; email: string; phone: string; role: string; status: string; }

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  activeTab = signal<'users'|'roles'|'perms'|'activity'>('users');
  search = signal('');
  roleFilter = signal('all');
  openUser = signal<User | null>(null);
  showInviteModal = signal(false);
  showEditModal = signal(false);
  editingUser = signal<User | null>(null);

  inviteRows: InviteRow[] = [{ email: '', name: '', role: 'Sales Staff' }];
  editForm: EditForm = { name: '', email: '', phone: '', role: '', status: 'active' };

  readonly modules = ['Dashboard','Inventory','Suppliers','Incoming Goods','Outgoing Goods','Returns','Marketplaces','Reports','Users & Roles'];

  readonly permMap: Record<string, Record<string, boolean>> = {
    'r-1': Object.fromEntries(this.modules.map(m => [m, true])),
    'r-2': Object.fromEntries(this.modules.map(m => [m, true])),
    'r-3': Object.fromEntries(this.modules.map(m => [m, ['Dashboard','Inventory','Suppliers','Incoming Goods','Outgoing Goods','Returns'].includes(m)])),
    'r-4': Object.fromEntries(this.modules.map(m => [m, ['Dashboard','Inventory','Outgoing Goods','Reports'].includes(m)])),
    'r-5': Object.fromEntries(this.modules.map(m => [m, ['Dashboard','Reports'].includes(m)])),
  };

  readonly activityLog = [
    { user: 'Alesia Karpova', action: 'Invited Lucinda Wills as Sales Staff', module: 'Users', time: '2026-05-09 09:12' },
    { user: 'Alesia Karpova', action: 'Changed role: Erik Pitman → Warehouse Staff', module: 'Users', time: '2026-05-08 14:22' },
    { user: 'Cardi Bautista', action: 'Updated Manager role permissions', module: 'Roles', time: '2026-05-07 11:05' },
    { user: 'Alesia Karpova', action: 'Deactivated Erik Pitman', module: 'Users', time: '2026-05-06 16:48' },
    { user: 'Alesia Karpova', action: 'Created Finance Staff role', module: 'Roles', time: '2026-05-01 10:00' },
  ];

  constructor(public data: DataService) {}

  get activeCount() { return this.data.users.filter(u => u.status === 'active').length; }

  get filteredUsers() {
    const s = this.search().toLowerCase();
    const rf = this.roleFilter();
    return this.data.users.filter(u => {
      if (rf !== 'all' && u.role !== rf) return false;
      if (s && !`${u.name} ${u.email}`.toLowerCase().includes(s)) return false;
      return true;
    });
  }

  toggleStatus(u: User) { u.status = u.status === 'active' ? 'inactive' : 'active'; }

  hasAccess(roleId: string, module: string): boolean { return this.permMap[roleId]?.[module] ?? false; }
  getInitials(name: string): string { return name.split(' ').map(n => n[0]).join(''); }

  openEdit(u: User) {
    this.editingUser.set(u);
    this.editForm = { name: u.name, email: u.email, phone: '', role: u.role, status: u.status };
    this.showEditModal.set(true);
    this.openUser.set(null);
  }

  saveEdit() {
    const u = this.editingUser();
    if (!u) return;
    u.name = this.editForm.name;
    u.email = this.editForm.email;
    u.role = this.editForm.role;
    u.status = this.editForm.status;
    this.showEditModal.set(false);
  }

  openInvite() {
    this.inviteRows = [{ email: '', name: '', role: 'Sales Staff' }];
    this.showInviteModal.set(true);
  }

  addInviteRow() { this.inviteRows = [...this.inviteRows, { email: '', name: '', role: 'Sales Staff' }]; }
  removeInviteRow(i: number) { this.inviteRows = this.inviteRows.filter((_, idx) => idx !== i); }

  sendInvites() {
    const valid = this.inviteRows.filter(r => r.email.trim());
    if (!valid.length) return;
    this.showInviteModal.set(false);
  }

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

  badgeColor(badge: string): string { return 'pill pill-' + badge; }
}
