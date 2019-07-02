import { Injectable } from '@angular/core';
import { ConstantService } from './../common/constant.service';
import { BasicUser } from './basicuser.model';
import { User } from './user.model';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/internal/Observable';
import { InfoResponse } from '../common/inforresponse.model';

@Injectable()
export class UserService {
  currentLang: string;
  displayDialog: boolean;
  private USER_URL = environment.WEBSERVICE_URL + '/user';
  private REGISTER_URL = this.USER_URL + '/register';
  private LOGIN_URL = this.USER_URL + '/login';
  private VERIFICATIONCODE_URL = this.USER_URL + '/verificationcode';

  private FORGETPASSWORD_URL = this.USER_URL + '/forgetPassword';
  private CHANGEPASSWORD_URL = this.USER_URL + '/changePassword';

  private MYPROFILE_URL = this.USER_URL + '/myprofile';

  constructor(private httpClient: HttpClient, private constantService: ConstantService) {}

  register(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.REGISTER_URL, body, { headers: this.constantService.addHttptHeader(true) });
  }

  login(user: User): Observable<HttpResponse<BasicUser>> {
    // here we require complete response
    return this.httpClient.post<BasicUser>(
      this.LOGIN_URL,
      {
        userName: user.userName,
        userPassword: user.userPassword
      },
      { headers: this.constantService.addHttptHeader(false), observe: 'response' }
    );
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.USER_URL + '/' + id, { headers: this.constantService.addHttptHeader(true) });
  }

  forgetPassword(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.FORGETPASSWORD_URL, body, { headers: this.constantService.addHttptHeader(true) });
  }

  changePassword(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.CHANGEPASSWORD_URL, body, { headers: this.constantService.addHttptHeader(true) });
  }

  resendVerificationCode(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.VERIFICATIONCODE_URL + '/resend', body, { headers: this.constantService.addHttptHeader(true) });
  }

  verifyEmailViaCode(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.VERIFICATIONCODE_URL + '/verifyemail', body, {
      headers: this.constantService.addHttptHeader(true)
    });
  }

  saveMyProfile(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.MYPROFILE_URL, body, { headers: this.constantService.addHttptHeader(true) });
  }
}
