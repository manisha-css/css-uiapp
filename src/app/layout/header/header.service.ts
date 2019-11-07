import { Injectable } from '@angular/core';
import { ConstantService } from '../../shared/constant.service';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { InfoResponse } from 'src/app/shared/inforresponse.model';
import { Router } from '@angular/router';
import * as IntroJs from 'intro.js/intro.js';
import { NGXLogger } from 'ngx-logger';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class HeaderService {
  private HELPINTRO_URL = environment.WEBSERVICE_URL + '/helpintro';
  selectedLang: string;

  constructor(
    private router: Router,
    private platformLocation: PlatformLocation,
    private logger: NGXLogger,
    private httpClient: HttpClient,
    private constantService: ConstantService
  ) {
    this.selectedLang = (this.platformLocation as any).location.pathname.substring(1, 3);
  }

  introMethod(routerurl: boolean, pageId?: string) {
    if (routerurl) {
      pageId = this.router.url;
    }
    this.helpintro(pageId).subscribe(
      (response: InfoResponse) => {
        const intro = IntroJs();
        intro.setOptions(response.result);
        this.logger.debug('Help info retrieved successfully' + response.result);
        intro.start();
      },
      () => {}
    );
  }

  helpintro(pageId: string): Observable<InfoResponse> {
    const params: HttpParams = new HttpParams().append('lang', this.selectedLang).append('pageid', pageId);
    return this.httpClient.get<InfoResponse>(this.HELPINTRO_URL, { headers: this.constantService.addHttptHeader(true), params });
  }
}
