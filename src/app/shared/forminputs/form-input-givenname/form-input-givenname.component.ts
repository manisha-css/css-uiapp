import { Component, OnInit, Input } from '@angular/core';

import { ControlContainer, NgForm } from '@angular/forms';
import { ConstantService } from '../../constant.service';

@Component({
  selector: 'app-form-input-givenname',
  templateUrl: './form-input-givenname.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormInputGivenNameComponent implements OnInit {
  @Input() givenName: string;
  constructor(public constantService: ConstantService) {}

  ngOnInit() {}
}
