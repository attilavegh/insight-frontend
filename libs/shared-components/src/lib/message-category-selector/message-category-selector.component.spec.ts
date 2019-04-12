import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCategorySelectorComponent } from './message-category-selector.component';

describe('InsightTypeRadioButton', () => {
  let component: MessageCategorySelectorComponent;
  let fixture: ComponentFixture<MessageCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
