import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { MyInsightPartialState } from './my-insight.reducer';
import {
  LoadMyInsight,
  MyInsightLoaded,
  MyInsightLoadError,
  MyInsightActionTypes
} from './my-insight.actions';

@Injectable()
export class MyInsightEffects {
  @Effect() loadMyInsight$ = this.dataPersistence.fetch(
    MyInsightActionTypes.LoadMyInsight,
    {
      run: (action: LoadMyInsight, state: MyInsightPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new MyInsightLoaded([]);
      },

      onError: (action: LoadMyInsight, error) => {
        console.error('Error', error);
        return new MyInsightLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<MyInsightPartialState>
  ) {}
}
