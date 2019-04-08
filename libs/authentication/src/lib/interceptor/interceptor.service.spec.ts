import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';

import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationServiceMock} from '../authentication/authentication.service.mock';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AuthenticationService, useClass: AuthenticationServiceMock }
    ]
  }));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });
});
