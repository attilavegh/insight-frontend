import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';

import { CoreModule } from '@insight/core';
import { NotificationModule } from '@insight/shared-components';
import { AuthenticationModule } from '@insight/authentication';
import { environmentToken } from '@insight/environment';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        AuthenticationModule,
        NotificationModule,
        StoreModule.forRoot({}, {}),
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: environmentToken, useValue: 'http://localhost:4200' }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
