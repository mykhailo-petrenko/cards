/* tslint:disable */
/** AAAAA */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Card } from '../models/card';

/**
 * Learn Controller
 */
@Injectable({
  providedIn: 'root',
})
class LearnControllerService extends __BaseService {
  static readonly acknowledgeUsingPOSTPath = '/api/v1/learn/acknowledge/{cardId}';
  static readonly getRandomCardUsingGETPath = '/api/v1/learn/card';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * acknowledge
   * @param params The `LearnControllerService.AcknowledgeUsingPOSTParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `name`:
   */
  acknowledgeUsingPOSTResponse(params: LearnControllerService.AcknowledgeUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/learn/acknowledge/${encodeURIComponent(String(params.cardId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * acknowledge
   * @param params The `LearnControllerService.AcknowledgeUsingPOSTParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `name`:
   */
  acknowledgeUsingPOST(params: LearnControllerService.AcknowledgeUsingPOSTParams): __Observable<null> {
    return this.acknowledgeUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * getRandomCard
   * @param name undefined
   * @return OK
   */
  getRandomCardUsingGETResponse(name?: string): __Observable<__StrictHttpResponse<Card>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/learn/card`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Card>;
      })
    );
  }
  /**
   * getRandomCard
   * @param name undefined
   * @return OK
   */
  getRandomCardUsingGET(name?: string): __Observable<Card> {
    return this.getRandomCardUsingGETResponse(name).pipe(
      __map(_r => _r.body as Card)
    );
  }
}

module LearnControllerService {

  /**
   * Parameters for acknowledgeUsingPOST
   */
  export interface AcknowledgeUsingPOSTParams {

    /**
     * cardId
     */
    cardId: number;
    name?: string;
  }
}

export { LearnControllerService }
