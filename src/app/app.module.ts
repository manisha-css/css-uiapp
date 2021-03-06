import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HealthCheckModule } from './health-check/health-check.module';
import { HomeModule } from './home/home.module';
import { MiscModule } from './misc/misc.module';
import { UserModule } from './user/user.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // angular material
    MatSliderModule,
    // application modules
    SharedModule,
    HealthCheckModule,
    LayoutModule,
    HomeModule,
    MiscModule,
    UserModule,
    AdminModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
