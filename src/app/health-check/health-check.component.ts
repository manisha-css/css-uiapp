
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
    private healthCheckService: HealthCheckService) { }

  ngOnInit() {
    this.getHealthCheckResponse();
  }

  getHealthCheckResponse() {
    this.healthCheckService.getServerResponse().subscribe(
      response => {
        this.logger.debug(
          'Received respnse from server [' + response.result + ']'
        );
        this.result = response.result;
      },
      () => {
      }
    );
  }

}
