import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  language: string;
  timezone: string;
  weekStart: string;
}

interface NotifPrefs {
  lowStockEmail: boolean;
  lowStockPush: boolean;
  returnsEmail: boolean;
  returnsPush: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
}

interface SecurityPrefs {
  twoFactor: boolean;
  allowSso: boolean;
  signInAlerts: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  section = signal<'overview'|'account'|'security'|'notifications'|'sessions'|'activity'>('overview');
  showLogoutConfirm = signal(false);
  copyToast = signal('');

  form: ProfileForm = {
    name: 'Alesia Karpova',
    email: 'alesia@waresync.io',
    phone: '+62 812 7710 0291',
    title: 'Workspace Owner',
    bio: 'Heads CMS rollout and supplier onboarding across the WareSync Indonesia network.',
    language: 'English (Indonesia)',
    timezone: 'Asia/Jakarta · GMT+7',
    weekStart: 'monday',
  };

  notifications: NotifPrefs = {
    lowStockEmail: true,
    lowStockPush: true,
    returnsEmail: true,
    returnsPush: false,
    weeklyDigest: true,
    productUpdates: false,
  };

  security: SecurityPrefs = {
    twoFactor: true,
    allowSso: true,
    signInAlerts: true,
  };

  readonly nav = [
    { id: 'overview', label: 'Overview', icon: 'user' },
    { id: 'account', label: 'Account', icon: 'cog' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'sessions', label: 'Sessions', icon: 'mobile' },
    { id: 'activity', label: 'Activity', icon: 'history' },
  ] as const;

  readonly modules = ['Dashboard','Inventory','Suppliers','Incoming Goods','Outgoing Goods','Returns','Marketplaces','Reports','Users & Roles'];

  readonly notifRows = [
    { label: 'Low-stock alerts', desc: 'Below minimum threshold on any SKU.', emailKey: 'lowStockEmail', pushKey: 'lowStockPush' },
    { label: 'Customer returns', desc: 'New return request awaiting approval.', emailKey: 'returnsEmail', pushKey: 'returnsPush' },
    { label: 'Weekly digest', desc: 'Sunday recap of sales, stock and exceptions.', emailKey: 'weeklyDigest', pushKey: null },
    { label: 'Product updates', desc: 'Announcements about new WareSync features.', emailKey: 'productUpdates', pushKey: null },
  ] as const;

  readonly sessions = [
    { device: 'Chrome on macOS', meta: 'Jakarta, Indonesia · 202.6.227.84 · Active now', current: true, icon: 'globe' },
    { device: 'WareSync iOS app', meta: 'Surabaya, ID · iPhone 14 Pro · Last active 4 hours ago', current: false, icon: 'mobile' },
    { device: 'Safari on macOS', meta: 'Jakarta, ID · 202.6.227.61 · Last active yesterday', current: false, icon: 'globe' },
  ];

  readonly activity = [
    { act: 'signed in', target: 'Chrome · Jakarta, ID', time: '12 min ago', icon: 'login', color: 'green' },
    { act: 'approved return', target: 'RC-26-00139', time: '2 hours ago', icon: 'check', color: 'blue' },
    { act: 'updated stock', target: 'KB-BLD-220', time: '5 hours ago', icon: 'box', color: 'purple' },
    { act: 'changed role for', target: 'lucinda@waresync.io', time: '8 hours ago', icon: 'shield', color: 'yellow' },
    { act: 'created supplier', target: 'Saltmark Provisions', time: 'Yesterday', icon: 'building', color: 'coral' },
    { act: 'exported report', target: 'Online Sales · April', time: '3 days ago', icon: 'download', color: 'pink' },
  ];

  constructor(public data: DataService, private router: Router) {}

  get me() {
    return this.data.users.find(u => u.name === this.data.currentUser.name) || this.data.users[0];
  }

  get role() {
    return this.data.roles.find(r => r.name === this.me.role);
  }

  get badgeClass() {
    return this.role ? `pill pill-${this.role.badge}` : 'pill pill-gray';
  }

  toggleNotif(key: keyof NotifPrefs) {
    this.notifications[key] = !this.notifications[key];
  }

  toggleSecurity(key: keyof SecurityPrefs) {
    this.security[key] = !this.security[key];
  }

  hasAccess(module: string): boolean {
    if (!this.role) return false;
    if (this.role.id === 'r-1' || this.role.id === 'r-2') return true;
    if (this.role.id === 'r-3') return ['Dashboard','Inventory','Suppliers','Incoming Goods','Outgoing Goods','Returns'].includes(module);
    if (this.role.id === 'r-4') return ['Dashboard','Inventory','Outgoing Goods','Reports'].includes(module);
    if (this.role.id === 'r-5') return ['Dashboard','Reports'].includes(module);
    return false;
  }

  get enabledModuleCount() {
    return this.modules.filter(m => this.hasAccess(m)).length;
  }

  copyEmail() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.form.email).catch(() => {});
    }
    this.copyToast.set('Email copied to clipboard');
    setTimeout(() => this.copyToast.set(''), 2200);
  }

  saveProfile() {
    this.copyToast.set('Profile updated');
    setTimeout(() => this.copyToast.set(''), 2200);
  }

  updatePassword() {
    this.copyToast.set('Password updated');
    setTimeout(() => this.copyToast.set(''), 2200);
  }

  revokeSession(idx: number) {
    if (this.sessions[idx].current) return;
    this.copyToast.set(`${this.sessions[idx].device} session revoked`);
    this.sessions.splice(idx, 1);
    setTimeout(() => this.copyToast.set(''), 2200);
  }

  signOutAllOthers() {
    const before = this.sessions.length;
    for (let i = this.sessions.length - 1; i >= 0; i--) {
      if (!this.sessions[i].current) this.sessions.splice(i, 1);
    }
    const removed = before - this.sessions.length;
    this.copyToast.set(`${removed} other session${removed !== 1 ? 's' : ''} signed out`);
    setTimeout(() => this.copyToast.set(''), 2200);
  }

  confirmSignOut() {
    this.showLogoutConfirm.set(false);
    this.router.navigate(['/login']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  avatarColor(color: string): string {
    const map: Record<string, string> = {
      purple: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
      coral: 'linear-gradient(135deg, var(--accent-coral), var(--accent-yellow))',
      yellow: 'linear-gradient(135deg, var(--accent-yellow), var(--accent-coral))',
      green: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
      blue: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
      pink: 'linear-gradient(135deg, var(--accent-pink), var(--accent-purple))',
    };
    return map[color] || map['purple'];
  }
}
