import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';
import { RedirectGuard } from '../shared/guards/redirect-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'en',
    canActivate: [RedirectGuard],
    component: HomeComponent,
    data: {
      externalUrl: environment.LANG_EN_URL
    }
  },
  {
    path: 'fr',
    canActivate: [RedirectGuard],
    component: HomeComponent, // use as dummy placeholder component
    data: {
      externalUrl: environment.LANG_FR_URL
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LayoutRoutingModule {}
