import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingComponent } from './paging.component';
import { ButtonComponent } from '../button/button.component';

describe('PagingComponent', () => {
  let component: PagingComponent;
  let fixture: ComponentFixture<PagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagingComponent,
        ButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
