import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from 'src/app/common/alert/alert.service';
import { ConstantService } from 'src/app/common/constant.service';
import { BasicUserService } from '../basicuser.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User = new User();
  returnUrl: string;
  isLoading: boolean;
  @ViewChild('loginForm', { static: false }) public loginForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private basicUserService: BasicUserService,
    public alertService: AlertService,
    public constantService: ConstantService
  ) {}

  ngOnInit() {
    // clear all cache
    this.basicUserService.clearStoredCache();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    // clear notifications
    this.alertService.clearAllAlerts();
  }

  onSubmit() {
    this.isLoading = true;
    this.userService
      .login(this.user)
      .pipe(
        finalize(() => {
          this.isFormSubmit = true;
          this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          this.basicUserService.basicuser = response.body;
          // save to local storage
          const headers = response.headers;
          const jwtToken = headers.get(this.constantService.AUTHORIZATION_HEADER_STRING);
          localStorage.setItem(this.constantService.LOCAL_STORAGE_JWTTOKEN, jwtToken);
          // logged in user id is stored to localstorage which is used during reload to retrieve basic user info from server
          localStorage.setItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID, this.basicUserService.basicuser.id);
          this.router.navigateByUrl(this.returnUrl);
        },
        () => {}
      );
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.loginForm.form.valueChanges.subscribe(() => {
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
