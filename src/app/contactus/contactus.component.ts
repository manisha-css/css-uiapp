import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AlertService } from 'src/app/common/alert/alert.service';
import { ConstantService } from '../common/constant.service';
import { InfoResponse } from '../common/inforresponse.model';
import { Contactus } from './contactus.model';
import { ContactusService } from './contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html'
})
export class ContactusComponent implements OnInit, OnDestroy, AfterViewInit {
  contactus: Contactus = new Contactus();
  isLoading: boolean;
  @ViewChild('contactusForm', { static: false }) public contactusForm: NgForm;
  formChangesSubscription: any;
  isFormSubmit: boolean;
  infoResponse: InfoResponse;

  constructor(
    private router: Router,
    public contactusService: ContactusService,
    public alertService: AlertService,
    public constantService: ConstantService
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.contactusService
      .saveContactus(this.contactus)
      .pipe(
        finalize(() => {
          this.isFormSubmit = true;
          this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          this.alertService.success(response.message);
        },
        () => {}
      );
  }

  ngOnInit() {
    // clear notifications
    this.alertService.clearAllAlerts();
  }
  onContinue() {
    this.router.navigate(['/user/login']);
  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.contactusForm.form.valueChanges.subscribe(() => {
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
