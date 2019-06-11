import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( 
    public router: Router,
    private logger: NGXLogger) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred.
          this.logger.error('Client side error: [' + error.error.message + ']');
        } else {
          // backend returns errorResponse with message
          if (error.status === 0) {
              // status returned will be 0 if backend server is not running
            this.logger.error('Backend server seems to be down, please try again later');
            return throwError(error);
          }
          this.logger.error(
            'Backend returned Status[: ' +
              error.status +
              '], Message: [' +
              error.error.message +
              '], Timestamp: [' +
              error.error.timestamp +
              ']'
          );
        }

        // return the error on the upper level:
        return throwError(error);
      })
    );
  }
}
