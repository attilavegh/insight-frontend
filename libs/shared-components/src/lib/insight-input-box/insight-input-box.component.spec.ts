import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightInputBoxComponent } from './insight-input-box.component';

describe('InsightInputBoxComponent', () => {
  let component: InsightInputBoxComponent;
  let fixture: ComponentFixture<InsightInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightInputBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
