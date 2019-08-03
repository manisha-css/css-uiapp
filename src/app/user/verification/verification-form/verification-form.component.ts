import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConstantService } from 'src/app/shared/constant.service';
import { AlertService } from '../../../shared/alert/alert.service';
import { InfoResponse } from '../../../shared/inforresponse.model';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-verification-form',
  templateUrl: './verification-form.component.html'
})
export class VerificationFormComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User = new User();
  displayPrivacyDialog: boolean;
  displayTermsDialog: boolean;
  isLoading: boolean;
  showSuccessMsg: boolean;
  @ViewChild('verificationCodeForm', { static: false }) public verificationCodeForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public alertService: AlertService,
    private logger: NGXLogger,
    public constantService: ConstantService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.user.userName = params.username;
    });
  }

  onSubmit() {
    this.logger.debug('Submit resend verification link');
    this.isLoading = true;
    this.user.userName = this.verificationCodeForm.value.email;
    this.userService
      .verifyEmailViaCode(this.user)
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
    this.formChangesSubscription = this.verificationCodeForm.form.valueChanges.subscribe(() => {
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
