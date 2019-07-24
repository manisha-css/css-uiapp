/**
 * Created by manisha on 12/16/16.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BasicUserService } from '../../user/basicuser.service';
import { AlertService } from '../alert/alert.service';
import { ConstantService } from '../constant.service';

@Injectable()
export class CanActivateAdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private basicUserService: BasicUserService,
    private alertService: AlertService,
    private constantService: ConstantService
  ) {}

  canActivate({}, state: RouterStateSnapshot) {
    if (this.basicUserService.isLoggedIn() && this.basicUserService.isAdmin()) {
      return true;
    }
    this.alertService.error(this.constantService.ADMIN_AUTHGUARD_LOGIN, true);
    this.router.navigate(['/user/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
