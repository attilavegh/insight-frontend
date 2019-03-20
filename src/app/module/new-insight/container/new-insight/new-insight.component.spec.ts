import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NewInsightComponent } from './new-insight.component';
import { UserSearchComponent } from '../../component/user-search/user-search.component';
import { InsightTypeSelectorComponent } from '../../component/insight-type-selector/insight-type-selector.component';
import { InsightInputBoxComponent } from '../../component/insight-input-box/insight-input-box.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('NewInsightComponent', () => {
  let component: NewInsightComponent;
  let fixture: ComponentFixture<NewInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewInsightComponent,
        UserSearchComponent,
        InsightTypeSelectorComponent,
        InsightInputBoxComponent
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule
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
