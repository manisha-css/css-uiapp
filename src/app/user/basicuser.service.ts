import { Injectable } from '@angular/core';
import { ConstantService } from '../shared/constant.service';

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
    if (!this.checkLocalCache()) {
      this.clearLocalCache();
    } else {
      const loggedInUserId = localStorage.getItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID);
      this.getBasicUserById(loggedInUserId).subscribe(
        response => {
          this.basicuser = response;
        },
        () => {
          this.clearLocalCache();
        }
      );
    }
  }

  getBasicUserById(id: string): Observable<BasicUser> {
    return this.httpClient.get<BasicUser>(this.USER_URL + '/basicuser/' + id, { headers: this.constantService.addHttptHeader(false) });
  }

  checkLocalCache(): boolean {
    const jwtToken = localStorage.getItem(this.constantService.LOCAL_STORAGE_JWTTOKEN);
    const loggedInUserId = localStorage.getItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID);

    return !(
      jwtToken === undefined ||
      jwtToken === null ||
      jwtToken.length === 0 ||
      loggedInUserId === undefined ||
      loggedInUserId === null ||
      loggedInUserId.length === 0 ||
      this.basicuser === undefined ||
      this.basicuser === null
    );
  }

  setLocalCache(jwtToken: string, basicuser: BasicUser) {
    localStorage.setItem(this.constantService.LOCAL_STORAGE_JWTTOKEN, jwtToken);
    localStorage.setItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID, basicuser.id);
    this.basicuser = basicuser;
  }

  clearLocalCache() {
    localStorage.setItem(this.constantService.LOCAL_STORAGE_JWTTOKEN, JSON.stringify({}));
    localStorage.setItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID, JSON.stringify({}));
    localStorage.clear();
    this.basicuser = null;
  }

  isLoggedIn(): boolean {
    if (this.checkLocalCache()) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.basicuser && this.basicuser.roles) {
      return this.basicuser.roles.includes('ADMIN');
    }
    return false;
  }
}
