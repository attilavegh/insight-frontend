import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageContainerComponent } from './message-container.component';

@NgModule({
  declarations: [MessageContainerComponent],
  imports: [CommonModule],
  exports: [MessageContainerComponent]
})
export class MessageContainerModule { }
