import { Injectable } from '@angular/core';
import { ConstantService } from '../common/constant.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BasicUser } from './basicuser.model';

@Injectable()
export class BasicUserService {
  basicuser: BasicUser;

  private USER_URL = environment.WEBSERVICE_URL + '/user';
  constructor(private httpClient: HttpClient, private constantService: ConstantService) {
    this.basicuser = new BasicUser();
    // this is to cater for reload of the page.
    if (!this.checkForLocalStorage()) {
      this.clearStoredCache();
    } else {
      const loggedInUserId = localStorage.getItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID);
      this.getBasicUserById(loggedInUserId).subscribe(
        response => {
          this.basicuser = response;
        },
        () => {
          this.clearStoredCache();
        }
      );
    }
  }
  // onNotifyHeader(userName: string) {
  //   this.headerUpdateSubject.next(userName);
  // }

  getBasicUserById(id: string): Observable<BasicUser> {
    return this.httpClient.get<BasicUser>(this.USER_URL + '/basicuser/' + id, { headers: this.constantService.addHttptHeader(false) });
  }

  checkForLocalStorage(): boolean {
    const jwtToken = localStorage.getItem(this.constantService.LOCAL_STORAGE_JWTTOKEN);
    const loggedInUserId = localStorage.getItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID);

    return !(
      jwtToken === undefined ||
      jwtToken === null ||
      jwtToken.length === 0 ||
      loggedInUserId === undefined ||
      loggedInUserId === null ||
      loggedInUserId.length === 0
    );
  }

  isLoggedIn(): boolean {
    if (!this.checkForLocalStorage()) {
      return false;
    }
    if (this.basicuser === undefined || this.basicuser === null) {
      return false;
    }
    return true;
  }

  clearStoredCache() {
    localStorage.setItem(this.constantService.LOCAL_STORAGE_JWTTOKEN, JSON.stringify({}));
    localStorage.setItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID, JSON.stringify({}));
    localStorage.clear();
    this.basicuser = null;
  }

  // below method is used for all user actions where login is required
  checkAndNotifyForNonLoggedIn() {
    if (!this.isLoggedIn()) {
      // this.alertService.showNotificationGrowls(this.alertService.SEVERITY_ERROR,
      //   this.alertService.SUMMERY_ERROR, 'Please login first!');
      return false;
    } else {
      return true;
    }
  }
}
