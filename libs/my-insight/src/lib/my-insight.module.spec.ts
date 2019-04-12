import { async, TestBed } from '@angular/core/testing';

import { MyInsightModule } from './my-insight.module';

describe('MyInsightModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MyInsightModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MyInsightModule).toBeDefined();
  });
});
