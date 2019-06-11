import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthCheckComponent } from './health-check/health-check.component';
import { ExceptionsComponent } from './common/exceptions/exceptions.component';
import { EXCEPTION_ROUTES } from './common/exceptions/exceptions.routes';

const routes: Routes = [
  { path: 'healthcheck', component: HealthCheckComponent },
  {
    path: 'exceptions',
    component: ExceptionsComponent,
    children: EXCEPTION_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
