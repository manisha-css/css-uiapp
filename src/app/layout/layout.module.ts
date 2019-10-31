import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderService } from './header/header.service';

@NgModule({
  declarations: [BodyComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, SharedModule, LayoutRoutingModule, FormsModule],
  providers: [HeaderService],
  exports: [BodyComponent, FooterComponent]
})
export class LayoutModule {}
