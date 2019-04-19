import { TestBed } from '@angular/core/testing';

import { environmentToken } from '@insight/environment';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: environmentToken,
        useValue: 'http://localhost:4200'
      }
    ]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
