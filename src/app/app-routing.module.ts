import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExceptionsComponent } from './common/exceptions/exceptions.component';
import { EXCEPTION_ROUTES } from './common/exceptions/exceptions.routes';
import { ContactusComponent } from './contactus/contactus.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { HomeComponent } from './home/home.component';

import { AboutusComponent } from './aboutus/aboutus.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { UserComponent } from './user/user.component';
import { USER_ROUTES } from './user/user.route';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'healthcheck', component: HealthCheckComponent },
  {
    path: 'exceptions',
    component: ExceptionsComponent,
    children: EXCEPTION_ROUTES
  },
  {
    path: 'user',
    component: UserComponent,
    children: USER_ROUTES
  },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'terms', component: TermsConditionsComponent },
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'contactus', component: ContactusComponent },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
