import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssignmentComponent } from './list-assignment.component';

describe('ListAssignmentComponent', () => {
  let component: ListAssignmentComponent;
  let fixture: ComponentFixture<ListAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAssignmentComponent]
    });
    fixture = TestBed.createComponent(ListAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
