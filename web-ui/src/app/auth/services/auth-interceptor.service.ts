import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authenticationService.getJwtToken();

    if (jwtToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
