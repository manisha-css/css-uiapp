import { Component, OnInit, Input } from '@angular/core';

import { ControlContainer, NgForm } from '@angular/forms';
import { ConstantService } from '../../constant.service';

@Component({
  selector: 'app-form-input-cnfpassword',
  templateUrl: './form-input-cnfpassword.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormInputConfirmPasswordComponent implements OnInit {
  @Input() confirmPassword: string;
  @Input() userPassword: string;

  constructor(public constantService: ConstantService) {}

  ngOnInit() {}
}
