import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  constructor(private httpClient: HttpClient) { }

  getServerResponse(): Observable<any> {
    return this.httpClient.get(environment.WEBSERVICE_URL + '/healthcheck');
  }
}
