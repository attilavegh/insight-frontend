import { TestBed, inject } from '@angular/core/testing';

import { LogoutGuard } from './logout.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('LogoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutGuard],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}, {}),
      ]
    });
  });

  it('should ...', inject([LogoutGuard], (guard: LogoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
