import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RippleModule } from '@insight/shared-directives';

import { LoginComponent } from './login-component/login.component';
import { authServiceConfig } from './authentication/authentication.config';
import { InterceptorService } from './interceptor/interceptor.service';

import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

const routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RippleModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useValue: authServiceConfig
    }
  ]
})
export class AuthenticationModule {}
