import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInsightComponent } from './my-insight.component';

describe('MyInsightComponent', () => {
  let component: MyInsightComponent;
  let fixture: ComponentFixture<MyInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInsightComponent ]
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
