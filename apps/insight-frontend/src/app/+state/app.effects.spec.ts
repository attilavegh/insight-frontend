import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';

import { AuthenticationService, AuthenticationServiceMock } from '@insight/authentication';

import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AppEffects,
        DataPersistence,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    });

    effects = TestBed.get(AppEffects);
  });

  describe('initApp$', () => {
  });
});
