import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CrudModule } from './crud/crud.module';
import { LearnModule } from './learn/learn.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    ApiModule.forRoot({
      rootUrl: environment.apiUrl
    }),
    AuthModule,
    CrudModule,
    LearnModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
