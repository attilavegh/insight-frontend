import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { NewInsightEffects } from './new-insight.effects';
import { NewInsightFacade } from './new-insight.facade';

import { newInsightQuery } from './new-insight.selectors';
import { LoadNewInsight, NewInsightLoaded } from './new-insight.actions';
import {
  NewInsightState,
  Entity,
  initialState,
  newInsightReducer
} from './new-insight.reducer';

interface TestSchema {
  newInsight: NewInsightState;
}

describe('NewInsightFacade', () => {
  let facade: NewInsightFacade;
  let store: Store<TestSchema>;
  let createNewInsight;

  beforeEach(() => {
    createNewInsight = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
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

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allNewInsight$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allNewInsight$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `NewInsightLoaded` to manually submit list for state management
     */
    it('allNewInsight$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allNewInsight$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new NewInsightLoaded([
            createNewInsight('AAA'),
            createNewInsight('BBB')
          ])
        );

        list = await readFirst(facade.allNewInsight$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
