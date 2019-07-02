import { AlertService } from '../../common/alert/alert.service';
import { InfoResponse } from './../../common/inforresponse.model';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConstantService } from '../../common/constant.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { BasicUserService } from './../basicuser.service';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html'
})
export class ChangePasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User = new User();
  isLoading: boolean;
  showSuccessMsg: boolean;
  @ViewChild('changePasswordForm', { static: false }) public changePasswordForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;

  constructor(
    private router: Router,
    public userService: UserService,
    public basicUserService: BasicUserService,
    public alertService: AlertService,
    public constantService: ConstantService
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.user.userName = this.basicUserService.basicuser.userName;
    this.userService
      .changePassword(this.user)
      .pipe(
        finalize(() => {
          this.isFormSubmit = true;
          this.isLoading = false;
        })
      )
      .subscribe(
        (response: InfoResponse) => {
          this.infoResponse = response;
          this.basicUserService.clearStoredCache();
          this.showSuccessMsg = true;
        },

        () => {}
      );
  }

  ngOnInit() {
    this.alertService.clearAllAlerts();
  }

  onContinue() {
    this.router.navigate(['/user/login']);
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.changePasswordForm.form.valueChanges.subscribe(() => {
      if (this.isFormSubmit) {
        this.alertService.clearAllAlerts();
        this.isFormSubmit = false;
      }
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }
}
