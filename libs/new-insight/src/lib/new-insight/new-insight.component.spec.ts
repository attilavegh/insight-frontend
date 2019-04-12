import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RippleModule } from '@insight/shared-directives';
import { ButtonModule, InsightInputBoxModule, InsightTypeSelectorModule, UserSearchModule } from '@insight/shared-components';

import { NewInsightComponent } from './new-insight.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environmentToken } from '@insight/environment';

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
        InsightInputBoxModule
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
