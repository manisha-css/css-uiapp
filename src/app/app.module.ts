import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ngx-custom-validators';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MessageService } from 'primeng/components/common/messageservice';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './common/alert/alert.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertService } from './common/alert/alert.service';
import { ConstantService } from './common/constant.service';
import { ExceptionGeneralComponent } from './common/exceptions/exceptions-general/exceptions-general.component';
import { ExceptionsComponent } from './common/exceptions/exceptions.component';
import { HttpErrorInterceptor } from './common/exceptions/http-error.interceptor';
import { CanActivateUserAuthGuard } from './common/guards/canactivate-userauthguard';
import { ContactusComponent } from './contactus/contactus.component';
import { ContactusService } from './contactus/contactus.service';
import { HealthCheckComponent } from './health-check/health-check.component';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthService } from './common/httpAuth/auth.service';
import { HttpAuthInterceptor } from './common/httpAuth/http-auth.interceptor';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { BasicUserService } from './user/basicuser.service';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { MyprofileComponent } from './user/myprofile/myprofile.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { VerificationFormComponent } from './user/verification/verification-form/verification-form.component';
import { VerificationResendComponent } from './user/verification/verification-resend/verification-resend.component';

// import { HttpAuthInterceptor } from './common/httpAuth/http-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HealthCheckComponent,

    // common-exceptions
    ExceptionsComponent,
    ExceptionGeneralComponent,
    // misc
    AboutusComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    ContactusComponent,
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
    VerificationResendComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: !environment.production ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF
    }),

    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    MessageService,
    AlertService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ConstantService,
    CanActivateUserAuthGuard,
    AuthService,
    UserService,
    ConstantService,
    BasicUserService,
    ContactusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
