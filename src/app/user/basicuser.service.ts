import { SocketIOService } from './../shared/socketio/socketio.service';
import { Injectable } from '@angular/core';
import { ConstantService } from '../shared/constant.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BasicUser } from './basicuser.model';

@Injectable()
export class BasicUserService {
  basicuser: BasicUser;
  onlineusers: number[];
  private USER_URL = environment.WEBSERVICE_URL + '/user';
  constructor(private socketIOService: SocketIOService, private httpClient: HttpClient, private constantService: ConstantService) {
    this.basicuser = new BasicUser();
    this.socketIOService.observeRefreshOnlineUsersListMessages().subscribe(() => {
      this.getOnlineUsers().subscribe(
        (response: number[]) => {
          this.onlineusers = response;
          console.log('=============== get new online users =======' + JSON.stringify(this.onlineusers));
        },
        () => {}
      );
    });
    // this is to cater for reload of the page.
    if (!this.checkLocalCache()) {
      this.clearLocalCache();
    } else {
      this.getBasicUserById().subscribe(
        response => {
          this.basicuser = response;
          this.socketIOService.emitMessage('loginsuccess', this.basicuser);
        },
        () => {
          this.clearLocalCache();
        }
      );
    }
  }

  getBasicUserById(): Observable<BasicUser> {
    return this.httpClient.get<BasicUser>(this.USER_URL + '/basicuser/info', { headers: this.constantService.addHttptHeader(false) });
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

  getOnlineUsers(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.USER_URL + '/online/all', { headers: this.constantService.addHttptHeader(true) });
  }
}
