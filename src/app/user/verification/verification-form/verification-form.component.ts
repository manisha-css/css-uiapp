import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConstantService } from 'src/app/common/constant.service';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { AlertService } from './../../../common/alert/alert.service';
import { InfoResponse } from './../../../common/inforresponse.model';

@Component({
  selector: 'app-verification-form',
  templateUrl: './verification-form.component.html'
})
export class VerificationFormComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User = new User();
  @Input() userName: string;
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
      this.userName = params['userName'];
    });
  }

  onSubmit() {
    this.logger.debug('Submit resend verification link');

    this.isLoading = true;
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

  ngOnInit() {
    this.user.userName = this.userName;
    this.alertService.clearAllAlerts();
  }
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
