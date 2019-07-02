import { AlertService } from './../common/alert/alert.service';

import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { InfoResponse } from '../common/inforresponse.model';
import { HealthCheckService } from './health-check.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html'
})
export class HealthCheckComponent implements OnInit {
  result: string;
  constructor(private logger: NGXLogger, private healthCheckService: HealthCheckService, public alertService: AlertService) {}

  ngOnInit() {
    this.alertService.clearAllAlerts();
    this.getServerHealthCheck();
  }

  getServerHealthCheck() {
    this.healthCheckService.getServerHealthCheck().subscribe(
      (response: InfoResponse) => {
        this.logger.debug('Received response from server [' + response.message + ']');
        this.result = response.message;
        this.alertService.success(this.result);
      },
      () => {}
    );
  }
}
