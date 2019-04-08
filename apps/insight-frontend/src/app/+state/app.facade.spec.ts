import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { AppEffects } from './app.effects';
import { AppFacade } from './app.facade';

import { AppState, initialState, appReducer } from './app.reducer';

interface TestSchema {
  app: AppState;
}

describe('AppFacade', () => {
  let facade: AppFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {

  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('app', appReducer, { initialState }),
          EffectsModule.forFeature([AppEffects])
        ],
        providers: [AppFacade]
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
      facade = TestBed.get(AppFacade);
    });
  });
});
