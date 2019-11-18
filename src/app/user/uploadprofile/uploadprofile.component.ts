import { BasicUserService } from '../basicuser.service';
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
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-uploadprofile',
  templateUrl: './uploadprofile.component.html'
})
export class UploadProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  file: File;
  url: string = null;
  fileext: string;

  user = new User();
  isLoading: boolean;
  showSuccessMsg: boolean;
  @ViewChild('uploadprofileForm', { static: false }) public uploadprofileForm: NgForm;
  formChangesSubscription: Subscription;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;

  SOCKET_URL = environment.SOCKET_URL;

  constructor(
    private router: Router,
    private userService: UserService,
    public alertService: AlertService,
    private logger: NGXLogger,
    public basicUserService: BasicUserService,
    public constantService: ConstantService
  ) {}

  onSubmit() {
    if (this.file === null || this.file === undefined) {
      this.alertService.error('Please select file');
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.file);
    this.logger.debug('Upload Profile');
    this.userService
      .uploadProfile(formData)
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
    const loggedInUserId = localStorage.getItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID);
    this.userService.getUserById(loggedInUserId).subscribe(
      (response: User) => {
        this.user = response;
        this.logger.debug('User info retrieved successfully');
      },
      () => {
        this.router.navigate(['/user/login'], {
          queryParams: { returnUrl: '/user/myprofile' }
        });
      }
    );
  }
  onContinue() {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.uploadprofileForm.form.valueChanges.subscribe(() => {
      if (this.isFormSubmit) {
        this.alertService.clearAllAlerts();
        this.isFormSubmit = false;
      }
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filename = event.target.files[0].name;
      this.fileext = filename.substr(filename.lastIndexOf('.') + 1);
      const reader = new FileReader();
      reader.onload = (loadevent: any) => {
        this.url = loadevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
    }
  }
}
