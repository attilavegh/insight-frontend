import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RippleModule } from '@insight/shared-directives';

import { LoginComponent } from './component/login/login.component';
import { InterceptorService } from './service/interceptor/interceptor.service';

const routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RippleModule,
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
    }
  ]
})
export class AuthenticationModule {}
