import { Component, OnInit, Input } from '@angular/core';

import { ControlContainer, NgForm } from '@angular/forms';
import { ConstantService } from '../../constant.service';

@Component({
  selector: 'app-form-input-password',
  templateUrl: './form-input-password.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormInputPasswordComponent implements OnInit {
  @Input() userPassword: string;
  constructor(public constantService: ConstantService) {}

  ngOnInit() {}
}
