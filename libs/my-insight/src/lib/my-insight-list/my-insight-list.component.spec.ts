import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingModule, MessageContainerModule } from '@insight/shared-components';

import { StoreModule } from '@ngrx/store';

import { MyInsightListComponent } from './my-insight-list.component';

describe('MyInsightListComponent', () => {
  let component: MyInsightListComponent;
  let fixture: ComponentFixture<MyInsightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MessageContainerModule,
        LoadingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('myInsight', {}, {})
      ],
      declarations: [
        MyInsightListComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInsightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
