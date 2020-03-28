/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { JwtAuthenticationRequest } from '../models/jwt-authentication-request';

/**
 * Jwt Authentication Controller
 */
@Injectable({
  providedIn: 'root',
})
class JwtAuthenticationControllerService extends __BaseService {
  static readonly authenticateUsingPOSTPath = '/api/v1/login';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * authenticate
   * @param request request
   * @return OK
   */
  authenticateUsingPOSTResponse(request: JwtAuthenticationRequest): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * authenticate
   * @param request request
   * @return OK
   */
  authenticateUsingPOST(request: JwtAuthenticationRequest): __Observable<{}> {
    return this.authenticateUsingPOSTResponse(request).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module JwtAuthenticationControllerService {
}

export { JwtAuthenticationControllerService }
