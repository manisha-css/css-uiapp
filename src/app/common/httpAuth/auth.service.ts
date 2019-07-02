import { Injectable } from '@angular/core';
import { ConstantService } from './../constant.service';

@Injectable()
export class AuthService {
  constructor(private constantService: ConstantService) {}

  getAuthorizationToken(): string {
    const jwtToken = localStorage.getItem(this.constantService.LOCAL_STORAGE_JWTTOKEN);
    if (jwtToken) {
      return jwtToken;
    } else {
      return '';
    }
  }
}
