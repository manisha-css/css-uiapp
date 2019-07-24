import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CanActivateAdminAuthGuard } from '../shared/guards/canactivate-adminauthguard';

const routes: Routes = [{ path: 'admin', component: AdminComponent, canActivate: [CanActivateAdminAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
