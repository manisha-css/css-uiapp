import { Component, OnInit, Input } from '@angular/core';

import { ControlContainer, NgForm } from '@angular/forms';
import { ConstantService } from '../../constant.service';

@Component({
  selector: 'app-form-input-username',
  templateUrl: './form-input-username.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormInputUserNameComponent implements OnInit {
  @Input() userName: string;
  constructor(public constantService: ConstantService) {}

  ngOnInit() {}
}
