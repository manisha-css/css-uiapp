import { Routes } from '@angular/router';
import { ExceptionGeneralComponent } from './exceptions-general/exceptions-general.component';

/**
 * Created by manisha on 04/16/17.
 */

export const EXCEPTION_ROUTES: Routes = [
  { path: '', redirectTo: 'general', pathMatch: 'full' },
  {
    path: 'general',
    component: ExceptionGeneralComponent
  }
];
