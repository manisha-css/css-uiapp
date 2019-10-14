import { Routes } from '@angular/router';
import { CanActivateUserAuthGuard } from '../shared/guards/canactivate-userauthguard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { RegisterComponent } from './register/register.component';
import { VerificationFormComponent } from './verification/verification-form/verification-form.component';
import { VerificationResendComponent } from './verification/verification-resend/verification-resend.component';
import { UserListComponent } from './user-list/user-list.component';

/**
 * Created by manisha on 4/21/17.
 */
export const USER_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    path: 'verification/resend',
    component: VerificationResendComponent
  },
  { path: 'verification/form', component: VerificationFormComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [CanActivateUserAuthGuard]
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [CanActivateUserAuthGuard]
  },
  {
    path: 'list',
    component: UserListComponent
  }
];
