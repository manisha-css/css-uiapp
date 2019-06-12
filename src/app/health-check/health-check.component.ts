import { NotificationService } from './../common/notification/notification.service';

import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './health-check.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html'
})
export class HealthCheckComponent implements OnInit {
  result: string;
  constructor(
    private logger: NGXLogger,
    private healthCheckService: HealthCheckService,
    public notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.clearAllNotifications();
    this.getHealthCheckResponse();
  }

  getHealthCheckResponse() {
    this.healthCheckService.getServerResponse().subscribe(
      response => {
        this.logger.debug(
          'Received respnse from server [' + response.message + ']'
        );
        this.result = response.message;
        this.notificationService.showNotificationToast(
          this.notificationService.SEVERITY_SUCCESS,
          this.notificationService.SUMMERY_SUCCESS,
          this.result);
      },
      () => {
      }
    );
  }
}
