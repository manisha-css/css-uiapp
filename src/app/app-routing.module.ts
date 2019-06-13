import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExceptionsComponent } from './common/exceptions/exceptions.component';
import { EXCEPTION_ROUTES } from './common/exceptions/exceptions.routes';
import { HealthCheckComponent } from './health-check/health-check.component';

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
export class AppRoutingModule {}
