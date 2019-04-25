import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ButtonModule,
  InsightInputBoxModule,
  InsightTypeSelectorModule,
  LoadingModule,
  UserSearchModule
} from '@insight/shared-components';
import { RippleModule } from '@insight/shared-directives';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NewInsightComponent } from './new-insight/new-insight.component';
import { NewInsightFacade } from './+state/new-insight.facade';
import { NEW_INSIGHT_FEATURE_KEY, initialState as newInsightInitialState, newInsightReducer } from './+state/new-insight.reducer';
import { NewInsightEffects } from './+state/new-insight.effects';

const routes: Routes = [
  { path: '', component: NewInsightComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    InsightTypeSelectorModule,
    UserSearchModule,
    InsightInputBoxModule,
    StoreModule.forFeature(NEW_INSIGHT_FEATURE_KEY, newInsightReducer, {
      initialState: newInsightInitialState
    }),
    EffectsModule.forFeature([NewInsightEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: [
    NewInsightComponent
  ],
  exports: [NewInsightComponent],
  providers: [NewInsightFacade]
})
export class NewInsightModule {}
