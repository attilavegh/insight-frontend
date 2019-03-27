import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleDirective } from '../../../../shared/directive/ripple/ripple.directive';

import { InsightTypeSelectorComponent } from './insight-type-selector.component';

describe('InsightTypeSelectorComponent', () => {
  let component: InsightTypeSelectorComponent;
  let fixture: ComponentFixture<InsightTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InsightTypeSelectorComponent,
        RippleDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
