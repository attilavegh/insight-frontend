import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule, InsightInputBoxModule, InsightTypeSelectorModule, UserSearchModule } from '@insight/shared-components';
import { RippleModule } from '@insight/shared-directives';
import { environmentProvider } from '@insight/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NewInsightComponent } from './new-insight/new-insight.component';
import { NewInsightFacade } from './+state/new-insight.facade';
import { NEWINSIGHT_FEATURE_KEY, initialState as newInsightInitialState, newInsightReducer } from './+state/new-insight.reducer';
import { NewInsightEffects } from './+state/new-insight.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    InsightTypeSelectorModule,
    UserSearchModule,
    InsightInputBoxModule,
    StoreModule.forFeature(NEWINSIGHT_FEATURE_KEY, newInsightReducer, {
      initialState: newInsightInitialState
    }),
    EffectsModule.forFeature([NewInsightEffects])
  ],
  declarations: [
    NewInsightComponent
  ],
  exports: [NewInsightComponent],
  providers: [NewInsightFacade]
})
export class NewInsightModule {}
