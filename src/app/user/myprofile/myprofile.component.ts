import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from '../../common/alert/alert.service';
import { ConstantService } from '../../common/constant.service';
import { BasicUserService } from '../basicuser.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { InfoResponse } from './../../common/inforresponse.model';
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
    private basicUserService: BasicUserService,
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
    this.userService.getUserById(this.basicUserService.basicuser.id).subscribe(
      (response: User) => {
        this.user = response;
        this.logger.debug('User info retrieved successfully');
      },
      () => {}
    );
  }
  onContinue() {
    this.router.navigate(['/user/login']);
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