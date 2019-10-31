import { Injectable } from '@angular/core';
import { ConstantService } from '../../shared/constant.service';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { InfoResponse } from 'src/app/shared/inforresponse.model';
import { Router } from '@angular/router';

@Injectable()
export class HeaderService {
  private HELPINTRO_URL = environment.WEBSERVICE_URL + '/helpintro';

  constructor(private router: Router, private httpClient: HttpClient, private constantService: ConstantService) {}

  helpintro(selectedLang: string): Observable<InfoResponse> {
    const params: HttpParams = new HttpParams().append('lang', selectedLang).append('pageid', this.router.url);
    return this.httpClient.get<InfoResponse>(this.HELPINTRO_URL, { headers: this.constantService.addHttptHeader(true), params });
  }
}
