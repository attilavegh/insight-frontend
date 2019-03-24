import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInsightComponent } from './my-insight.component';
import { MessageFilterComponent } from '../component/message-filter/message-filter.component';
import { MessageTypeSelectorComponent } from '../component/message-type-selector/message-type-selector.component';
import { ButtonComponent } from '../../../../shared/component/button/button.component';
import { PagingComponent } from '../../../../shared/component/paging/paging.component';
import { MessageComponent } from '../component/message/message.component';

describe('MyInsightComponent', () => {
  let component: MyInsightComponent;
  let fixture: ComponentFixture<MyInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyInsightComponent,
        MessageFilterComponent,
        MessageTypeSelectorComponent,
        MessageComponent,
        ButtonComponent,
        PagingComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
