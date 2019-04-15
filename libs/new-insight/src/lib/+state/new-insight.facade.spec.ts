import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { NewInsightEffects } from './new-insight.effects';
import { NewInsightFacade } from './new-insight.facade';
import { NewInsightState, initialState, newInsightReducer } from './new-insight.reducer';

interface TestSchema {
  newInsight: NewInsightState;
}

describe('NewInsightFacade', () => {
  let facade: NewInsightFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('newInsight', newInsightReducer, {
            initialState
          }),
          EffectsModule.forFeature([NewInsightEffects])
        ],
        providers: [NewInsightFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(NewInsightFacade);
    });
  });
});
