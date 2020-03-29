import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ConfirmComponent,
    ProfileComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule { }
