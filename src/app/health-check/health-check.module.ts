import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { HealthCheckRoutingModule } from './health-check-routing.module';
import { HealthCheckComponent } from './health-check.component';
import { HealthCheckService } from './health-check.service';

@NgModule({
  declarations: [HealthCheckComponent],
  imports: [CommonModule, HealthCheckRoutingModule, SharedModule],
  providers: [HealthCheckService]
})
export class HealthCheckModule {}
