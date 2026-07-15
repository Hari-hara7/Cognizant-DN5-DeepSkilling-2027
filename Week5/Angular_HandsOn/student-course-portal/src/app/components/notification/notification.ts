import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  // Component-level providers create a separate NotificationService instance for this component and its children.
  providers: [NotificationService]
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {
    this.notificationService.add('Component-scoped notification service is active.');
  }

  get messages(): string[] {
    return this.notificationService.getMessages();
  }
}
