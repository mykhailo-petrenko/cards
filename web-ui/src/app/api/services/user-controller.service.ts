/* tslint:disable */
/** AAAAA */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserDTO } from '../models/user-dto';
import { UserPasswordDTO } from '../models/user-password-dto';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly getMyInfoUsingGETPath = '/api/v1/me';
  static readonly updateMyInfoUsingPOSTPath = '/api/v1/me';
  static readonly updatePasswordUsingPOSTPath = '/api/v1/me/password';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getMyInfo
   * @param name undefined
   * @return OK
   */
  getMyInfoUsingGETResponse(name?: string): __Observable<__StrictHttpResponse<UserDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/me`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDTO>;
      })
    );
  }
  /**
   * getMyInfo
   * @param name undefined
   * @return OK
   */
  getMyInfoUsingGET(name?: string): __Observable<UserDTO> {
    return this.getMyInfoUsingGETResponse(name).pipe(
      __map(_r => _r.body as UserDTO)
    );
  }

  /**
   * updateMyInfo
   * @param params The `UserControllerService.UpdateMyInfoUsingPOSTParams` containing the following parameters:
   *
   * - `userDTO`: userDTO
   *
   * - `name`:
   *
   * @return OK
   */
  updateMyInfoUsingPOSTResponse(params: UserControllerService.UpdateMyInfoUsingPOSTParams): __Observable<__StrictHttpResponse<UserDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.userDTO;
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/me`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDTO>;
      })
    );
  }
  /**
   * updateMyInfo
   * @param params The `UserControllerService.UpdateMyInfoUsingPOSTParams` containing the following parameters:
   *
   * - `userDTO`: userDTO
   *
   * - `name`:
   *
   * @return OK
   */
  updateMyInfoUsingPOST(params: UserControllerService.UpdateMyInfoUsingPOSTParams): __Observable<UserDTO> {
    return this.updateMyInfoUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as UserDTO)
    );
  }

  /**
   * updatePassword
   * @param params The `UserControllerService.UpdatePasswordUsingPOSTParams` containing the following parameters:
   *
   * - `passwordDTO`: passwordDTO
   *
   * - `name`:
   */
  updatePasswordUsingPOSTResponse(params: UserControllerService.UpdatePasswordUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.passwordDTO;
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/me/password`,
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
   * updatePassword
   * @param params The `UserControllerService.UpdatePasswordUsingPOSTParams` containing the following parameters:
   *
   * - `passwordDTO`: passwordDTO
   *
   * - `name`:
   */
  updatePasswordUsingPOST(params: UserControllerService.UpdatePasswordUsingPOSTParams): __Observable<null> {
    return this.updatePasswordUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UserControllerService {

  /**
   * Parameters for updateMyInfoUsingPOST
   */
  export interface UpdateMyInfoUsingPOSTParams {

    /**
     * userDTO
     */
    userDTO: UserDTO;
    name?: string;
  }

  /**
   * Parameters for updatePasswordUsingPOST
   */
  export interface UpdatePasswordUsingPOSTParams {

    /**
     * passwordDTO
     */
    passwordDTO: UserPasswordDTO;
    name?: string;
  }
}

export { UserControllerService }
