import { TestBed } from '@angular/core/testing';

import { InsightService } from './insight.service';

describe('InsightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsightService = TestBed.get(InsightService);
    expect(service).toBeTruthy();
  });
});
