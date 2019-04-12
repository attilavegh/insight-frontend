import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HamburgerIconComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {}
