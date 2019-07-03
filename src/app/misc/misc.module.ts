import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ContactusService } from './contactus/contactus.service';
import { MiscRoutingModule } from './misc-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [AboutusComponent, PrivacyPolicyComponent, TermsConditionsComponent, ContactusComponent],
  imports: [CommonModule, MiscRoutingModule, SharedModule, FormsModule],
  providers: [ContactusService],
  exports: [TermsConditionsComponent, PrivacyPolicyComponent]
})
export class MiscModule {}
