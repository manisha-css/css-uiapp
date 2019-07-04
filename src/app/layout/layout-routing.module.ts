import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';
import { RedirectGuard } from '../shared/guards/redirect-guard';

// need to define below constant for compodoc as 1.1.9 version otherwise fails
const enUrl = {
  data: environment.LANG_EN_URL
};
const frUrl = {
  data: environment.LANG_EN_URL
};
const routes: Routes = [
  {
    path: 'en',
    canActivate: [RedirectGuard],
    component: HomeComponent, // use as dummy placeholder component
    data: {
      externalUrl: enUrl.data
    }
  },
  {
    path: 'fr',
    canActivate: [RedirectGuard],
    component: HomeComponent, // use as dummy placeholder component
    data: {
      externalUrl: frUrl.data
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LayoutRoutingModule {}
