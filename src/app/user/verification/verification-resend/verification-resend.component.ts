import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConstantService } from 'src/app/shared/constant.service';
import { AlertService } from '../../../shared/alert/alert.service';
import { InfoResponse } from '../../../shared/inforresponse.model';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-verification-resend',
  templateUrl: './verification-resend.component.html'
})
export class VerificationResendComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User = new User();
  isLoading: boolean;
  showSuccessMsg: boolean;
  @ViewChild('resendVerificationCodeForm', { static: false }) public resendVerificationCodeForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;

  constructor(
    private router: Router,
    private userService: UserService,
    public alertService: AlertService,
    private logger: NGXLogger,
    public constantService: ConstantService
  ) {}

  onSubmit() {
    this.logger.debug('Submit resend verification code');

    this.isLoading = true;
    this.userService
      .resendVerificationCode(this.user)
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

  ngOnInit() {
    this.alertService.clearAllAlerts();
  }
  onContinue() {
    this.router.navigate(['/user/login']);
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.resendVerificationCodeForm.form.valueChanges.subscribe(() => {
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
