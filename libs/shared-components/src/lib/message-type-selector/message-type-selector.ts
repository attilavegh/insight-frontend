import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '@insight/shared-directives';

import { MessageTypeSelectorComponent } from './message-type-selector.component';

@NgModule({
  declarations: [MessageTypeSelectorComponent],
  imports: [CommonModule, RippleModule],
  exports: [MessageTypeSelectorComponent]
})
export class MessageTypeSelectorModule { }
