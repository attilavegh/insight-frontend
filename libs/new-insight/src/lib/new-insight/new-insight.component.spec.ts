import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { RippleModule } from '@insight/shared-directives';
import { environmentToken } from '@insight/environment';
import { ButtonModule, InsightInputBoxModule, InsightTypeSelectorModule, UserSearchModule } from '@insight/shared-components';

import { NewInsightComponent } from './new-insight.component';

describe('NewInsightComponent', () => {
  let component: NewInsightComponent;
  let fixture: ComponentFixture<NewInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewInsightComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        InsightTypeSelectorModule,
        UserSearchModule,
        InsightInputBoxModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('newInsight', {}, {})
      ],
      providers: [
        {
          provide: environmentToken,
          useValue: 'http://localhost:4200'
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
