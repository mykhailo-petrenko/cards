import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpSentEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private readonly UNAUTHORIZED_STATUSES = [403];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authenticationService.getJwtToken();

    if (jwtToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    if (this.UNAUTHORIZED_STATUSES.includes(error.status)) {
      this.authenticationService.logOut();
      this.router.navigateByUrl('/login');
    }
  }
}
