import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ConstantService } from '../../shared/constant.service';
import { InfoResponse } from '../../shared/inforresponse.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: 'forget-password.component.html'
})
export class ForgetPasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User = new User();
  isLoading: boolean;
  showSuccessMsg: boolean;
  @ViewChild('forgetPasswordForm', { static: false }) public forgetPasswordForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;
  constructor(private router: Router, private userService: UserService, public alertService: AlertService, public constantService: ConstantService) {}

  onSubmit() {
    this.isLoading = true;
    this.user.userName = this.forgetPasswordForm.value.email;
    this.userService
      .forgetPassword(this.user)
      .pipe(
        finalize(() => {
          this.isFormSubmit = true;
          this.isLoading = false;
        })
      )
      .subscribe(
        (response: InfoResponse) => {
          this.infoResponse = response;
          this.showSuccessMsg = true;
        },
        () => {}
      );
  }

  ngOnInit() {}

  onContinue() {
    this.router.navigate(['/user/login']);
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.forgetPasswordForm.form.valueChanges.subscribe(() => {
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
