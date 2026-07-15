import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
