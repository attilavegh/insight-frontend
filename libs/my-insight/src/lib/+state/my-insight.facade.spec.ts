import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { MyInsightEffects } from './my-insight.effects';
import { MyInsightFacade } from './my-insight.facade';

import { myInsightQuery } from './my-insight.selectors';
import { LoadMyInsight, MyInsightLoaded } from './my-insight.actions';
import {
  MyInsightState,
  Entity,
  initialState,
  myInsightReducer
} from './my-insight.reducer';

interface TestSchema {
  myInsight: MyInsightState;
}

describe('MyInsightFacade', () => {
  let facade: MyInsightFacade;
  let store: Store<TestSchema>;
  let createMyInsight;

  beforeEach(() => {
    createMyInsight = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('myInsight', myInsightReducer, {
            initialState
          }),
          EffectsModule.forFeature([MyInsightEffects])
        ],
        providers: [MyInsightFacade]
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
      facade = TestBed.get(MyInsightFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allMyInsight$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allMyInsight$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `MyInsightLoaded` to manually submit list for state management
     */
    it('allMyInsight$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allMyInsight$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new MyInsightLoaded([createMyInsight('AAA'), createMyInsight('BBB')])
        );

        list = await readFirst(facade.allMyInsight$);
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
