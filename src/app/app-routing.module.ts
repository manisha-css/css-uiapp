import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthCheckComponent } from './health-check/health-check.component';

const routes: Routes = [
  { path: 'healthcheck', component: HealthCheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
