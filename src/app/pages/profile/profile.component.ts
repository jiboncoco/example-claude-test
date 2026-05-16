import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  activeSection = signal('overview');

  readonly sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'account', label: 'Account' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'activity', label: 'Activity' },
  ];

  constructor(public data: DataService) {}

  getSectionLabel(): string {
    return this.sections.find(s => s.id === this.activeSection())?.label ?? '';
  }
}
