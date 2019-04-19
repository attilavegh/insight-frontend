import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { InsightService, UserService } from '@insight/shared-services';
import { InsightFormData, User } from '@insight/shared-model';

import { debounceTime, distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';

import { NewInsightPartialState } from './new-insight.reducer';
import {
  NewInsightActionTypes,
  SearchUser,
  SearchUserError,
  SearchUserLoaded,
  SubmitForm,
  SubmitFormError,
  SubmitFormSuccess
} from './new-insight.actions';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Injectable()
export class NewInsightEffects {
  @Effect() search$ = this.dataPersistence.fetch(NewInsightActionTypes.SearchUser, {
      run: () => {
        return this.actions$.pipe(
          map((action: SearchUser) => action.payload),
          filter(value => typeof value === 'string'),
          filter((payload: string) => payload.length > 1),
          distinctUntilChanged(),
          debounceTime(300),
          switchMap((name: string) => this.userService.search(name)),
          map((users: User[]) => new SearchUserLoaded(users)),
        );
      },

      onError: (action: SearchUser, error) => {
        console.error('Error', error);
        return new SearchUserError(error);
      }
    }
  );

  @Effect() send$ = this.dataPersistence.fetch(NewInsightActionTypes.SubmitForm, {
      run: (action: SubmitForm) => {
        return this.appFacade.user$.pipe(
          take(1),
          map((user: User) => ({ ...action.payload, sender: user.googleId })),
          switchMap((data: InsightFormData) => this.insightService.send(data)),
          map(() => new SubmitFormSuccess())
        );
      },

      onError: (action: SubmitForm, error) => {
        console.error('Error', error);
        return new SubmitFormError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private insightService: InsightService,
    private appFacade: AppFacade,
    private dataPersistence: DataPersistence<NewInsightPartialState>
  ) {}
}
