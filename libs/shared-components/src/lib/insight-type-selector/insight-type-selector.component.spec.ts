import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleModule } from '@insight/shared-directives';

import { InsightTypeSelectorComponent } from './insight-type-selector.component';

describe('InsightTypeSelectorComponent', () => {
  let component: InsightTypeSelectorComponent;
  let fixture: ComponentFixture<InsightTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RippleModule
      ],
      declarations: [
        InsightTypeSelectorComponent
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
