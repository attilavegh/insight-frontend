import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyInsightComponent } from '@insight/my-insight';
import { MessageFilterComponent } from '@insight/shared-components/src/lib/message-filter/message-filter.component';
import { MessageTypeSelectorComponent } from '@insight/shared-components/src/lib/message-type-selector/message-type-selector.component';
import { MessageContainerComponent } from '@insight/shared-components/src/lib/message-container/message-container.component';
import { ButtonComponent } from '@insight/shared-components/src/lib/button/button.component';
import { PagingComponent } from '@insight/shared-components/src/lib/paging/paging.component';


describe('MyInsightComponent', () => {
  let component: MyInsightComponent;
  let fixture: ComponentFixture<MyInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyInsightComponent,
        MessageFilterComponent,
        MessageTypeSelectorComponent,
        MessageContainerComponent,
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
