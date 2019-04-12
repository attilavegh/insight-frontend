import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContainerModule } from '@insight/shared-components';

import { StoreModule } from '@ngrx/store';

import { MyInsightReceivedComponent } from './my-insight-received.component';

describe('MyInsightReceivedComponent', () => {
  let component: MyInsightReceivedComponent;
  let fixture: ComponentFixture<MyInsightReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MessageContainerModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('myInsight', {}, {})
      ],
      declarations: [
        MyInsightReceivedComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInsightReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
