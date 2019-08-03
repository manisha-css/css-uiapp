import { FormInputConfirmPasswordComponent } from './form-input-cnfpassword/form-input-cnfpassword.component';
import { FormInputPasswordComponent } from './form-input-password/form-input-password.component';
import { FormInputGivenNameComponent } from './form-input-givenname/form-input-givenname.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputUserNameComponent } from './form-input-username/form-input-username.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  declarations: [FormInputUserNameComponent, FormInputGivenNameComponent, FormInputPasswordComponent, FormInputConfirmPasswordComponent],
  imports: [CommonModule, FormsModule, CustomFormsModule],
  exports: [FormInputUserNameComponent, FormInputGivenNameComponent, FormInputPasswordComponent, FormInputConfirmPasswordComponent]
})
export class ForminputsModule {}
