import { TestBed } from '@angular/core/testing';

import { environmentToken } from '@insight/environment';

import { BrowserNotificationService } from './browser-notification.service';

describe('BrowserNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: environmentToken,
        useValue: 'http://localhost:4200'
      }
    ]
  }));

  it('should be created', () => {
    const service: BrowserNotificationService = TestBed.get(BrowserNotificationService);
    expect(service).toBeTruthy();
  });
});
