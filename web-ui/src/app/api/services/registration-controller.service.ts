/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Registration Controller
 */
@Injectable({
  providedIn: 'root',
})
class RegistrationControllerService extends __BaseService {
  static readonly addUserUsingPOSTPath = '/api/v1/registration';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * addUser
   * @param params The `RegistrationControllerService.AddUserUsingPOSTParams` containing the following parameters:
   *
   * - `password`: password
   *
   * - `name`: name
   *
   * - `email`: email
   */
  addUserUsingPOSTResponse(params: RegistrationControllerService.AddUserUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.password != null) __params = __params.set('password', params.password.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.email != null) __params = __params.set('email', params.email.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/registration`,
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
   * addUser
   * @param params The `RegistrationControllerService.AddUserUsingPOSTParams` containing the following parameters:
   *
   * - `password`: password
   *
   * - `name`: name
   *
   * - `email`: email
   */
  addUserUsingPOST(params: RegistrationControllerService.AddUserUsingPOSTParams): __Observable<null> {
    return this.addUserUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module RegistrationControllerService {

  /**
   * Parameters for addUserUsingPOST
   */
  export interface AddUserUsingPOSTParams {

    /**
     * password
     */
    password?: string;

    /**
     * name
     */
    name?: string;

    /**
     * email
     */
    email?: string;
  }
}

export { RegistrationControllerService }
