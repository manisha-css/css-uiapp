import { Injectable, OnInit } from '@angular/core';

import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class NotificationService implements OnInit {
  public SEVERITY_SUCCESS = 'success';
  public SEVERITY_INFO = 'info';
  public SEVERITY_WARN = 'warn';
  public SEVERITY_ERROR = 'error';
  public SUMMERY_SUCCESS = 'Success:';
  public SUMMERY_INFO = 'Information:';
  public SUMMERY_WARN = 'Warning::';
  public SUMMERY_ERROR = 'Error Message:';

  public notification_msgs: Message[] = [];

  constructor(private messageService: MessageService) {}

  public showNotificationToast(severity: string, summary: string, detail: string) {
    const notificationToast = '{"severity": "' + severity + '", "summary": "' + summary + '", "detail": "' + detail + '"}';
    this.messageService.add(JSON.parse(notificationToast));
  }

  public showNotificationMessages(severity: string, summary: string, detail: string) {
    this.notification_msgs = [];
    const notificationMessage = '{"severity": "' + severity + '", "summary": "' + summary + '", "detail": "' + detail + '"}';
    this.notification_msgs.push(JSON.parse(notificationMessage));
  }

  public clearAllNotifications() {
    this.notification_msgs = [];
    this.messageService.clear();
  }

  ngOnInit() {
    this.clearAllNotifications();
  }
}
