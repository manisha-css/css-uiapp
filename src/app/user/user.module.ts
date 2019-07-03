import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { MiscModule } from '../misc/misc.module';
import { SharedModule } from './../shared/shared.module';
import { BasicUserService } from './basicuser.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { VerificationFormComponent } from './verification/verification-form/verification-form.component';
import { VerificationResendComponent } from './verification/verification-resend/verification-resend.component';

@NgModule({
  declarations: [
    // user related
    RegisterComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    LoginComponent,
    LogoutComponent,
    MyprofileComponent,
    UserComponent,
    MyprofileComponent,
    VerificationFormComponent,
    VerificationResendComponent
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, FormsModule, CustomFormsModule, MiscModule],
  providers: [UserService, BasicUserService]
})
export class UserModule {}
