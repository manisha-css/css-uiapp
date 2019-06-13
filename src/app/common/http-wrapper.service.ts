import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpWrapperService {
  constructor(private httpClient: HttpClient) {}

  addHttptHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Accept-Language', 'US');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  httpGet(url: string) {
    const headers = this.addHttptHeader();
    return this.httpClient.get(url, { headers });
  }

  httpGetWithParams(url: string, params: HttpParams) {
    const headers = this.addHttptHeader();
    return this.httpClient.get(url, { headers, params });
  }

  httpPost(url: string, body: any) {
    const headers = this.addHttptHeader();
    return this.httpClient.post(url, body, { headers });
  }

  httpPostWithParams(url: string, body: any, params: HttpParams) {
    const headers = this.addHttptHeader();
    return this.httpClient.post(url, body, { headers, params });
  }

  httpPut(url: string, body: any) {
    const headers = this.addHttptHeader();
    return this.httpClient.put(url, body, { headers });
  }

  httpDelete(url: string) {
    const headers = this.addHttptHeader();
    return this.httpClient.delete(url, { headers });
  }
}
