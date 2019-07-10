import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { ConstantService } from '../constant.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, private alertService: AlertService, private logger: NGXLogger, private constantService: ConstantService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred.
          this.logger.error('Client side error: [' + error.error.message + ']');
        } else {
          // backend returns errorResponse with message
          if (error.status === 0) {
            // status returned will be 0 if backend server is not running
            this.logger.error(this.constantService.BACKEND_SERVER_DOWN);
            this.alertService.error(this.constantService.BACKEND_SERVER_DOWN);
            return throwError(error);
          }
          if (error.status === 404) {
            // status returned will be 0 if backend server is not running
            this.logger.error(this.constantService.BACKEND_NOT_FOUND);
            this.alertService.error(this.constantService.BACKEND_NOT_FOUND);
            return throwError(error);
          }
          if (error.error === undefined || error.error === null) {
            this.alertService.error(error.message);
            this.logger.error('Error Status[: ' + error.status + '], Message: [' + error.message + '], Timestamp: [' + error.error.timestamp + ']');
          } else {
            this.alertService.error(error.error.message);
            this.logger.error(
              'Error Status[: ' + error.status + '], Message: [' + error.error.message + '], Timestamp: [' + error.error.timestamp + ']'
            );
          }
        }

        // return the error on the upper level:
        return throwError(error);
      })
    );
  }
}
