import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { environmentToken } from '@insight/environment';

import { InsightService } from './insight.service';

describe('InsightService', () => {
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
    const service: InsightService = TestBed.get(InsightService);
    expect(service).toBeTruthy();
  });
});
