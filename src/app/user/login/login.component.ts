import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ConstantService } from 'src/app/shared/constant.service';
import { BasicUserService } from '../basicuser.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { SocketIOService } from 'src/app/shared/socketio/socketio.service';

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
    private socketIOService: SocketIOService,
    public alertService: AlertService,
    public constantService: ConstantService
  ) {}

  ngOnInit() {
    // clear all cache
    this.basicUserService.clearLocalCache();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
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
          // save to local storage
          const headers = response.headers;
          const jwtToken = headers.get(this.constantService.AUTHORIZATION_HEADER_STRING);
          this.basicUserService.setLocalCache(jwtToken, response.body.result);
          this.router.navigateByUrl(this.returnUrl);
          // emit the message to server
          this.socketIOService.emitMessage('loginsuccess', this.basicUserService.basicuser);
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
