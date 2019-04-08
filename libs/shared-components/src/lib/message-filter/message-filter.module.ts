import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '@insight/shared-directives';

import { MessageFilterComponent } from './message-filter.component';

@NgModule({
  declarations: [MessageFilterComponent],
  imports: [CommonModule, RippleModule],
  exports: [MessageFilterComponent]
})
export class MessageFilterModule { }
