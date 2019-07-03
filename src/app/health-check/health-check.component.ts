import { AlertService } from '../shared/alert/alert.service';

import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/internal/operators/finalize';
import { InfoResponse } from '../shared/inforresponse.model';
import { HealthCheckService } from './health-check.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html'
})
export class HealthCheckComponent implements OnInit {
  isLoading: boolean;
  result: string;
  constructor(private logger: NGXLogger, private healthCheckService: HealthCheckService, public alertService: AlertService) {}

  ngOnInit() {
    this.alertService.clearAllAlerts();
    this.getServerHealthCheck();
  }

  getServerHealthCheck() {
    this.isLoading = true;
    this.healthCheckService
      .getServerHealthCheck()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response: InfoResponse) => {
          this.logger.debug('Received response from server [' + response.message + ']');
          this.result = response.message;
        },
        () => {}
      );
  }
}
