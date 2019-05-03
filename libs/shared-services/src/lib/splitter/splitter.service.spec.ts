import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { environmentToken } from '@insight/environment';

import { SplitterService } from './splitter.service';

describe('SplitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: environmentToken,
        useValue: 'http://localhost:4200'
      }
    ]
  }));

  it('should be created', () => {
    const service: SplitterService = TestBed.get(SplitterService);
    expect(service).toBeTruthy();
  });
});
