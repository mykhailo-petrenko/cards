/* tslint:disable */
/** AAAAA */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageCard } from '../models/page-card';
import { Card } from '../models/card';

/**
 * Cards Controller
 */
@Injectable({
  providedIn: 'root',
})
class CardsControllerService extends __BaseService {
  static readonly getCardsUsingGETPath = '/api/v1/cards';
  static readonly createCardUsingPOSTPath = '/api/v1/cards';
  static readonly getCardUsingGETPath = '/api/v1/cards/{cardId}';
  static readonly updateCardUsingPOSTPath = '/api/v1/cards/{cardId}';
  static readonly deleteCardUsingDELETEPath = '/api/v1/cards/{cardId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getCards
   * @param params The `CardsControllerService.GetCardsUsingGETParams` containing the following parameters:
   *
   * - `unpaged`:
   *
   * - `sort.unsorted`:
   *
   * - `sort.sorted`:
   *
   * - `paged`:
   *
   * - `pageSize`:
   *
   * - `pageNumber`:
   *
   * - `offset`:
   *
   * - `name`:
   *
   * @return OK
   */
  getCardsUsingGETResponse(params: CardsControllerService.GetCardsUsingGETParams): __Observable<__StrictHttpResponse<PageCard>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.unpaged != null) __params = __params.set('unpaged', params.unpaged.toString());
    if (params.sortUnsorted != null) __params = __params.set('sort.unsorted', params.sortUnsorted.toString());
    if (params.sortSorted != null) __params = __params.set('sort.sorted', params.sortSorted.toString());
    if (params.paged != null) __params = __params.set('paged', params.paged.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.pageNumber != null) __params = __params.set('pageNumber', params.pageNumber.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/cards`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageCard>;
      })
    );
  }
  /**
   * getCards
   * @param params The `CardsControllerService.GetCardsUsingGETParams` containing the following parameters:
   *
   * - `unpaged`:
   *
   * - `sort.unsorted`:
   *
   * - `sort.sorted`:
   *
   * - `paged`:
   *
   * - `pageSize`:
   *
   * - `pageNumber`:
   *
   * - `offset`:
   *
   * - `name`:
   *
   * @return OK
   */
  getCardsUsingGET(params: CardsControllerService.GetCardsUsingGETParams): __Observable<PageCard> {
    return this.getCardsUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageCard)
    );
  }

  /**
   * createCard
   * @param params The `CardsControllerService.CreateCardUsingPOSTParams` containing the following parameters:
   *
   * - `card`: card
   *
   * - `name`:
   *
   * @return OK
   */
  createCardUsingPOSTResponse(params: CardsControllerService.CreateCardUsingPOSTParams): __Observable<__StrictHttpResponse<Card>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.card;
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/cards`,
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
   * createCard
   * @param params The `CardsControllerService.CreateCardUsingPOSTParams` containing the following parameters:
   *
   * - `card`: card
   *
   * - `name`:
   *
   * @return OK
   */
  createCardUsingPOST(params: CardsControllerService.CreateCardUsingPOSTParams): __Observable<Card> {
    return this.createCardUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as Card)
    );
  }

  /**
   * getCard
   * @param params The `CardsControllerService.GetCardUsingGETParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `name`:
   *
   * @return OK
   */
  getCardUsingGETResponse(params: CardsControllerService.GetCardUsingGETParams): __Observable<__StrictHttpResponse<Card>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/cards/${encodeURIComponent(String(params.cardId))}`,
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
   * getCard
   * @param params The `CardsControllerService.GetCardUsingGETParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `name`:
   *
   * @return OK
   */
  getCardUsingGET(params: CardsControllerService.GetCardUsingGETParams): __Observable<Card> {
    return this.getCardUsingGETResponse(params).pipe(
      __map(_r => _r.body as Card)
    );
  }

  /**
   * updateCard
   * @param params The `CardsControllerService.UpdateCardUsingPOSTParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `card`: card
   *
   * - `name`:
   *
   * @return OK
   */
  updateCardUsingPOSTResponse(params: CardsControllerService.UpdateCardUsingPOSTParams): __Observable<__StrictHttpResponse<Card>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.card;
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/cards/${encodeURIComponent(String(params.cardId))}`,
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
   * updateCard
   * @param params The `CardsControllerService.UpdateCardUsingPOSTParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `card`: card
   *
   * - `name`:
   *
   * @return OK
   */
  updateCardUsingPOST(params: CardsControllerService.UpdateCardUsingPOSTParams): __Observable<Card> {
    return this.updateCardUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as Card)
    );
  }

  /**
   * deleteCard
   * @param params The `CardsControllerService.DeleteCardUsingDELETEParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `name`:
   *
   * @return OK
   */
  deleteCardUsingDELETEResponse(params: CardsControllerService.DeleteCardUsingDELETEParams): __Observable<__StrictHttpResponse<Card>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/cards/${encodeURIComponent(String(params.cardId))}`,
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
   * deleteCard
   * @param params The `CardsControllerService.DeleteCardUsingDELETEParams` containing the following parameters:
   *
   * - `cardId`: cardId
   *
   * - `name`:
   *
   * @return OK
   */
  deleteCardUsingDELETE(params: CardsControllerService.DeleteCardUsingDELETEParams): __Observable<Card> {
    return this.deleteCardUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as Card)
    );
  }
}

module CardsControllerService {

  /**
   * Parameters for getCardsUsingGET
   */
  export interface GetCardsUsingGETParams {
    unpaged?: boolean;
    sortUnsorted?: boolean;
    sortSorted?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    offset?: number;
    name?: string;
  }

  /**
   * Parameters for createCardUsingPOST
   */
  export interface CreateCardUsingPOSTParams {

    /**
     * card
     */
    card: Card;
    name?: string;
  }

  /**
   * Parameters for getCardUsingGET
   */
  export interface GetCardUsingGETParams {

    /**
     * cardId
     */
    cardId: number;
    name?: string;
  }

  /**
   * Parameters for updateCardUsingPOST
   */
  export interface UpdateCardUsingPOSTParams {

    /**
     * cardId
     */
    cardId: number;

    /**
     * card
     */
    card: Card;
    name?: string;
  }

  /**
   * Parameters for deleteCardUsingDELETE
   */
  export interface DeleteCardUsingDELETEParams {

    /**
     * cardId
     */
    cardId: number;
    name?: string;
  }
}

export { CardsControllerService }
