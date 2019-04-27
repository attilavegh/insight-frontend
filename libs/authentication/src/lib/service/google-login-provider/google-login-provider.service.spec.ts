import { TestBed } from '@angular/core/testing';

import { GoogleLoginProviderService } from './google-login-provider.service';

xdescribe('GoogleLoginProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleLoginProviderService = TestBed.get(GoogleLoginProviderService);
    expect(service).toBeTruthy();
  });
});
