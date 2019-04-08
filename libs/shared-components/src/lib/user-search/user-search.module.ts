import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSearchComponent } from './user-search.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserSearchComponent],
  exports: [UserSearchComponent]
})
export class UserSearchModule {}
