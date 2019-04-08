import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { NewInsightPartialState } from './new-insight.reducer';
import {
  LoadNewInsight,
  NewInsightLoaded,
  NewInsightLoadError,
  NewInsightActionTypes
} from './new-insight.actions';

@Injectable()
export class NewInsightEffects {
  @Effect() loadNewInsight$ = this.dataPersistence.fetch(
    NewInsightActionTypes.LoadNewInsight,
    {
      run: (action: LoadNewInsight, state: NewInsightPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new NewInsightLoaded([]);
      },

      onError: (action: LoadNewInsight, error) => {
        console.error('Error', error);
        return new NewInsightLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<NewInsightPartialState>
  ) {}
}
