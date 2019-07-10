import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from '../../shared/alert/alert.service';
import { ConstantService } from '../../shared/constant.service';
import { InfoResponse } from '../../shared/inforresponse.model';
import { User } from '../user.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html'
})
export class MyprofileComponent implements OnInit, OnDestroy, AfterViewInit {
  user = new User();
  isLoading: boolean;
  showSuccessMsg: boolean;
  @ViewChild('myprofileForm', { static: false }) public myprofileForm: NgForm;
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
    this.logger.debug('Submit MyProfile');
    this.isLoading = true;
    this.userService
      .saveMyProfile(this.user)
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
    // clear notifications
    this.alertService.clearAllAlerts();
    const loggedInUserId = localStorage.getItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID);
    this.userService.getUserById(loggedInUserId).subscribe(
      (response: User) => {
        this.user = response;
        this.logger.debug('User info retrieved successfully');
      },
      () => {}
    );
  }
  onContinue() {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.myprofileForm.form.valueChanges.subscribe(() => {
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
