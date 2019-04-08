import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessageContainerModule, MessageFilterModule, MessageTypeSelectorModule, PagingModule } from '@insight/shared-components';
import { RippleModule } from '@insight/shared-directives';

import { MyInsightComponent } from './my-insight/my-insight.component';
import { MYINSIGHT_FEATURE_KEY, initialState as myInsightInitialState, myInsightReducer } from './+state/my-insight.reducer';
import { MyInsightEffects } from './+state/my-insight.effects';
import { MyInsightFacade } from './+state/my-insight.facade';

@NgModule({
  imports: [
    CommonModule,
    PagingModule,
    RippleModule,
    MessageContainerModule,
    MessageTypeSelectorModule,
    MessageFilterModule,
    StoreModule.forFeature(MYINSIGHT_FEATURE_KEY, myInsightReducer, {
      initialState: myInsightInitialState
    }),
    EffectsModule.forFeature([MyInsightEffects])
  ],
  declarations: [
    MyInsightComponent
  ],
  exports: [MyInsightComponent],
  providers: [MyInsightFacade]
})
export class MyInsightModule {}
