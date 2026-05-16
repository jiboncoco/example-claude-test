import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, User } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

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

  private toast = inject(ToastService);

  constructor(public data: DataService) {}

  private validEmail(s: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s || '').trim());
  }

  isInviteRowValid(row: InviteRow): boolean {
    return !!row.email && this.validEmail(row.email);
  }

  get hasValidInvites(): boolean {
    return this.inviteRows.some(r => this.isInviteRowValid(r));
  }

  private randColor(): string {
    const colors = ['purple', 'coral', 'yellow', 'green', 'blue', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private deriveInitials(email: string, name: string): string {
    if (name && name.trim()) {
      return name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }
    const local = (email.split('@')[0] || '').slice(0, 2);
    return local.toUpperCase() || 'XX';
  }

  sendResetLink(u: User) {
    this.toast.push(`Password reset link sent to ${u.email}`);
  }

  removeUser(u: User | null) {
    if (!u) return;
    const idx = this.data.users.findIndex(x => x.id === u.id);
    if (idx >= 0) {
      this.data.users.splice(idx, 1);
      this.toast.push(`Removed ${u.name}`);
    }
    this.showEditModal.set(false);
    this.openUser.set(null);
  }

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
    if (!this.editForm.name || !this.validEmail(this.editForm.email)) {
      this.toast.push('Name and a valid email are required', 'error');
      return;
    }
    u.name = this.editForm.name;
    u.email = this.editForm.email;
    u.role = this.editForm.role;
    u.status = this.editForm.status;
    this.showEditModal.set(false);
    this.toast.push(`Saved changes to ${u.name}`);
  }

  openInvite() {
    this.inviteRows = [{ email: '', name: '', role: 'Sales Staff' }];
    this.showInviteModal.set(true);
  }

  addInviteRow() { this.inviteRows = [...this.inviteRows, { email: '', name: '', role: 'Sales Staff' }]; }
  removeInviteRow(i: number) { this.inviteRows = this.inviteRows.filter((_, idx) => idx !== i); }

  sendInvites() {
    const valid = this.inviteRows.filter(r => this.isInviteRowValid(r));
    if (!valid.length) {
      this.toast.push('Add at least one valid email address', 'error');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    valid.forEach(r => {
      const initials = this.deriveInitials(r.email, r.name);
      const id = 'u-' + Math.random().toString(36).slice(2, 7);
      this.data.users.push({
        id,
        name: r.name.trim() || r.email.split('@')[0],
        email: r.email.trim().toLowerCase(),
        role: r.role,
        status: 'active',
        last: 'Invited just now',
        joined: today,
        initials,
        color: this.randColor(),
      });
    });
    this.showInviteModal.set(false);
    this.toast.push(`Invitations sent to ${valid.length} ${valid.length === 1 ? 'person' : 'people'}`);
  }

  avatarColor(color: string): string {
    // Match design: purple↔pink, coral↔yellow, others↔purple
    const map: Record<string, string> = {
      purple: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
      coral: 'linear-gradient(135deg, var(--accent-coral), var(--accent-yellow))',
      yellow: 'linear-gradient(135deg, var(--accent-yellow), var(--accent-purple))',
      green: 'linear-gradient(135deg, var(--accent-green), var(--accent-purple))',
      blue: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
      pink: 'linear-gradient(135deg, var(--accent-pink), var(--accent-purple))',
    };
    return map[color] || map['purple'];
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
