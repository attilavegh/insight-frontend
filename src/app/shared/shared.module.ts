import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './component/header/header.component';
import { HamburgerIconComponent } from './component/hamburger-menu/hamburger-icon.component';
import { ButtonComponent } from './component/button/button.component';
import { RippleDirective } from './directive/ripple/ripple.directive';
import { PagingComponent } from './component/paging/paging.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HamburgerIconComponent,
    ButtonComponent,
    RippleDirective,
    PagingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    HamburgerIconComponent,
    ButtonComponent,
    RippleDirective,
    PagingComponent
  ]
})
export class SharedModule {}
