import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { ConstantService } from './constant.service';
import { ExceptionGeneralComponent } from './exceptions/exceptions-general/exceptions-general.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { HttpErrorInterceptor } from './exceptions/http-error.interceptor';
import { CanActivateUserAuthGuard } from './guards/canactivate-userauthguard';
import { RedirectGuard } from './guards/redirect-guard';
import { AuthService } from './httpAuth/auth.service';
import { HttpAuthInterceptor } from './httpAuth/http-auth.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { SharedRoutingModule } from './shared-routing.module';
import { CanActivateAdminAuthGuard } from './guards/canactivate-adminauthguard';

@NgModule({
  declarations: [AlertComponent, ExceptionsComponent, ExceptionGeneralComponent, LoaderComponent],
  imports: [
    LoggerModule.forRoot({
      level: !environment.production ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    CommonModule,
    HttpClientModule,
    SharedRoutingModule
  ],
  providers: [
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    },
    ConstantService,
    CanActivateUserAuthGuard,
    CanActivateAdminAuthGuard,
    RedirectGuard,
    AuthService
  ],
  exports: [AlertComponent, LoaderComponent]
})
export class SharedModule {}
