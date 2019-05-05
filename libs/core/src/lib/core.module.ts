import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HamburgerIconComponent } from './components/hamburger-icon/hamburger-icon.component';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { HeaderDesktopComponent } from './components/header-desktop/header-desktop.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HamburgerIconComponent,
    HeaderComponent,
    HeaderMobileComponent,
    HeaderDesktopComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {}
