import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { UserControllerService } from '../../api/services/user-controller.service';
import { JwtAuthenticationControllerService } from '../../api/services/jwt-authentication-controller.service';
import { JwtAuthenticationRequest } from '../../api/models/jwt-authentication-request';
import { LoginRequest } from '../auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly JWT_TOKEN_NAME = 'CARDS_JWT_TOKEN';

  private jwtToken: string;
  private jwtTokenExpirationTime: Date;

  constructor(
    private authenticationController: JwtAuthenticationControllerService
  ) {
    this.jwtToken = localStorage.getItem(this.JWT_TOKEN_NAME);
    this.jwtTokenExpirationTime = null;
  }

  public logIn(request: LoginRequest): Promise<any> {
    const body = {
      password: request.password,
      username: request.email
    } as JwtAuthenticationRequest;

    return this.authenticationController.authenticateUsingPOST(body)
      .pipe(
        tap((response: {token: string}) => {
          this.setJwtToken(response.token);
        })
      )
      .toPromise();
  }

  public logOut() {
    this.setJwtToken(null);
  }

  setJwtToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem(this.JWT_TOKEN_NAME, token);

    // @TODO: Calculate expiration datetime from token
    // this.jwtTokenExpirationTime = ...
  }

  getJwtToken(): string {
    return this.jwtToken;
  }

  isJwtTokenExpired(): boolean {
    // @TODO: Implememt after expiration datetime will be calculated
    return false;
  }
}
