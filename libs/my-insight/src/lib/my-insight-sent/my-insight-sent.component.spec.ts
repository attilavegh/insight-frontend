import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContainerModule } from '@insight/shared-components';

import { StoreModule } from '@ngrx/store';

import { MyInsightSentComponent } from './my-insight-sent.component';

describe('MyInsightSentComponent', () => {
  let component: MyInsightSentComponent;
  let fixture: ComponentFixture<MyInsightSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MessageContainerModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('myInsight', {}, {})
      ],
      declarations: [
        MyInsightSentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInsightSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
