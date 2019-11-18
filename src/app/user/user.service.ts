import { Injectable } from '@angular/core';
import { ConstantService } from '../shared/constant.service';
import { User } from './user.model';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/internal/Observable';
import { InfoResponse } from '../shared/inforresponse.model';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class UserService {
  displayDialog: boolean;
  private USER_URL = environment.WEBSERVICE_URL + '/user';
  private REGISTER_URL = this.USER_URL + '/register';
  private LOGIN_URL = this.USER_URL + '/login';
  private VERIFICATIONCODE_URL = this.USER_URL + '/verification';

  private FORGETPASSWORD_URL = this.USER_URL + '/forgetPassword';
  private CHANGEPASSWORD_URL = this.USER_URL + '/changePassword';

  private MYPROFILE_URL = this.USER_URL + '/myprofile';

  constructor(private platformLocation: PlatformLocation, private httpClient: HttpClient, private constantService: ConstantService) {}

  register(user: User): Observable<InfoResponse> {
    const body = JSON.stringify(user);
    return this.httpClient.post<InfoResponse>(this.REGISTER_URL, body, { headers: this.constantService.addHttptHeader(true) });
  }

  login(user: User): Observable<HttpResponse<InfoResponse>> {
    // here we require complete response

    return this.httpClient.post<InfoResponse>(
      this.LOGIN_URL,
      {
        userName: user.userName,
        userPassword: user.userPassword
      },
      { headers: this.constantService.addHttptHeader(true), observe: 'response' }
    );
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.USER_URL + '/' + id, { headers: this.constantService.addHttptHeader(true) });
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.USER_URL + '/', { headers: this.constantService.addHttptHeader(true) });
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

  uploadProfile(formData: FormData): Observable<InfoResponse> {
    let headers = new HttpHeaders();
    const selectedLang = (this.platformLocation as any).location.pathname.substring(1, 3);
    headers = headers.append('Accept-Language', selectedLang).append('Accept', 'application/json');
    return this.httpClient.post<InfoResponse>(this.MYPROFILE_URL, formData, { headers });
  }
}
