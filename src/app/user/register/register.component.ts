import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InfoResponse } from 'src/app/shared/inforresponse.model';
import { ConstantService } from '../../shared/constant.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  user = new User();
  showSuccessMsg: boolean;
  displayPrivacyDialog: boolean;
  displayTermsDialog: boolean;
  isLoading: boolean;
  @ViewChild('registerForm', { static: false }) public registerForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;

  constructor(private router: Router, private userService: UserService, public alertService: AlertService, public constantService: ConstantService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    this.userService
      .register(this.user)
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

  onTermsAndConditionsDialog() {
    this.displayTermsDialog = true;
  }

  public onPrivacyPolicyDialog() {
    this.displayPrivacyDialog = true;
  }

  onTermsAndConditionsDialogHide() {
    this.displayTermsDialog = false;
  }

  onPrivacyPolicyDialogHide() {
    this.displayPrivacyDialog = false;
  }
  onContinue() {
    this.router.navigate(['/user/verification/form'], { queryParams: { username: this.user.userName } });
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.registerForm.form.valueChanges.subscribe(() => {
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
