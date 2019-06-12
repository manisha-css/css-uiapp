import { ConstantService } from './common/constant.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './common/exceptions/http-error.interceptor';
import { ExceptionsComponent } from './common/exceptions/exceptions.component';
import { ExceptionGeneralComponent } from './common/exceptions/exceptions-general/exceptions-general.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { NotificationService } from './common/notification/notification.service';
import { HttpWrapperService } from './common/http-wrapper.service';

@NgModule({
  declarations: [
    AppComponent,
    HealthCheckComponent,
    // common-exceptions
    ExceptionsComponent,
    ExceptionGeneralComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: !environment.production
        ? NgxLoggerLevel.DEBUG
        : NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    MessageService,
    NotificationService,
    HttpWrapperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
