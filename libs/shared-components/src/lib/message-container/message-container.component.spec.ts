import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightCategory, User } from '@insight/shared-model';

import { MessageContainerComponent } from './message-container.component';

describe('MessageContainerComponent', () => {
  let component: MessageContainerComponent;
  let fixture: ComponentFixture<MessageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageContainerComponent);
    component = fixture.componentInstance;

    component.message = {
      id: 1,
      date: new Date(),
      formattedDate: new Date().toDateString(),
      sender: {} as User,
      receiver: {} as User,
      continueMessage: 'Continue',
      considerMessage: 'Consider'
    };

    component.category = InsightCategory.SENT;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
