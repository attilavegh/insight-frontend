import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RippleModule } from '@insight/shared-directives';

import { MessageCategorySelectorComponent } from './message-category-selector.component';

@NgModule({
  declarations: [MessageCategorySelectorComponent],
  imports: [CommonModule, RippleModule, RouterModule],
  exports: [MessageCategorySelectorComponent]
})
export class MessageCategorySelectorModule {}
