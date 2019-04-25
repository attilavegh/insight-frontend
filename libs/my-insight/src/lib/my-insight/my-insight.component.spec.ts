import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageFilterModule, MessageCategorySelectorModule, ButtonModule } from '@insight/shared-components';

import { StoreModule } from '@ngrx/store';

import { MyInsightComponent } from './my-insight.component';

xdescribe('MyInsightComponent', () => {
  let component: MyInsightComponent;
  let fixture: ComponentFixture<MyInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MessageFilterModule,
        MessageCategorySelectorModule,
        ButtonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('myInsight', {}, {})
      ],
      declarations: [
        MyInsightComponent
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
