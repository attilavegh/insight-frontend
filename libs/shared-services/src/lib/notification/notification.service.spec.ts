import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('BrowserNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
