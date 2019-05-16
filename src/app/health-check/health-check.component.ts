
import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './health-check.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html'
})
export class HealthCheckComponent implements OnInit {
  result: string;
  constructor(
    private healthCheckService: HealthCheckService) { }

  ngOnInit() {
    this.getHealthCheckResponse();
  }

  getHealthCheckResponse() {
    this.healthCheckService.getServerResponse()
      .subscribe(
        response => {
          this.result = response.result;
        },
        error => {
          console.log('error' + error);
        }
      );
  }

}
