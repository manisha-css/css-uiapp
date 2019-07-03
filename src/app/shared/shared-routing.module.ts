import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { EXCEPTION_ROUTES } from './exceptions/exceptions.routes';

const routes: Routes = [
  {
    path: 'exceptions',
    component: ExceptionsComponent,
    children: EXCEPTION_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SharedRoutingModule {}
