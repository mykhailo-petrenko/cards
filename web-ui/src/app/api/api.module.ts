/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { WebMvcLinksHandlerService } from './services/web-mvc-links-handler.service';
import { OperationHandlerService } from './services/operation-handler.service';
import { CardsControllerService } from './services/cards-controller.service';
import { LearnControllerService } from './services/learn-controller.service';
import { JwtAuthenticationControllerService } from './services/jwt-authentication-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { RegistrationControllerService } from './services/registration-controller.service';
import { BasicErrorControllerService } from './services/basic-error-controller.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    WebMvcLinksHandlerService,
    OperationHandlerService,
    CardsControllerService,
    LearnControllerService,
    JwtAuthenticationControllerService,
    UserControllerService,
    RegistrationControllerService,
    BasicErrorControllerService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
