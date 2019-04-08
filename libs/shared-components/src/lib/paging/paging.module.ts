import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';

import { PagingComponent } from './paging.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [PagingComponent],
  exports: [PagingComponent]
})
export class PagingModule {}
