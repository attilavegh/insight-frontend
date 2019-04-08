import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTypeSelectorComponent } from './message-type-selector.component';

describe('InsightTypeRadioButton', () => {
  let component: MessageTypeSelectorComponent;
  let fixture: ComponentFixture<MessageTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
