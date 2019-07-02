import { Injectable } from '@angular/core';
import { ConstantService } from 'src/app/common/constant.service';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../common/inforresponse.model';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  constructor(
    private httpClient: HttpClient,
    private constantService: ConstantService // private httpWrapperService: HttpWrapperService
  ) {}

  getServerHealthCheck(): Observable<InfoResponse> {
    return this.httpClient.get<InfoResponse>(environment.WEBSERVICE_URL + '/healthcheck', { headers: this.constantService.addHttptHeader(true) });
  }
}
