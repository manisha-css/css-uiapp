import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { ConstantService } from './common/constant.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MessageService } from 'primeng/components/common/messageservice';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExceptionGeneralComponent } from './common/exceptions/exceptions-general/exceptions-general.component';
import { ExceptionsComponent } from './common/exceptions/exceptions.component';
import { HttpErrorInterceptor } from './common/exceptions/http-error.interceptor';
import { HttpWrapperService } from './common/http-wrapper.service';
import { NotificationService } from './common/notification/notification.service';
import { HealthCheckComponent } from './health-check/health-check.component';

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
      level: !environment.production ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.ERROR,
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
export class AppModule {}
