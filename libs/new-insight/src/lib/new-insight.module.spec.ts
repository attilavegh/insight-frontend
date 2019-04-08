import { async, TestBed } from '@angular/core/testing';
import { NewInsightModule } from './new-insight.module';

describe('NewInsightModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NewInsightModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NewInsightModule).toBeDefined();
  });
});
