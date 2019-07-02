import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from 'src/app/common/constant.service';
import { AuthService } from './auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private constantService: ConstantService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set(this.constantService.AUTHORIZATION_HEADER_STRING, authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
