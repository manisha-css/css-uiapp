import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpWrapperService } from '../common/http-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  constructor(private httpWrapperService: HttpWrapperService) {}


  getServerResponse(): Observable<any> {
    return this.httpWrapperService.httpGet(environment.WEBSERVICE_URL + '/healthcheck');
  }
}
