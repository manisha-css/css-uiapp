import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from './../common/constant.service';

import { Contactus } from './contactus.model';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { InfoResponse } from '../common/inforresponse.model';

@Injectable()
export class ContactusService {
  public CONTACTUS_URL = environment.WEBSERVICE_URL + '/contactus';

  constructor(private httpClient: HttpClient, private constantService: ConstantService) {}

  saveContactus(contactus: Contactus): Observable<InfoResponse> {
    const body = JSON.stringify(contactus);
    return this.httpClient.post<InfoResponse>(this.CONTACTUS_URL, body, { headers: this.constantService.addHttptHeader(true) });
  }
}
