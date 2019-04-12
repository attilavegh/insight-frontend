import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFilterComponent } from './message-filter.component';
import { defaultFilter } from '@insight/shared-model';

describe('MessageFilterComponent', () => {
  let component: MessageFilterComponent;
  let fixture: ComponentFixture<MessageFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFilterComponent);
    component = fixture.componentInstance;

    component.filterOptions = [defaultFilter];
    component.selectedFilter = defaultFilter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
