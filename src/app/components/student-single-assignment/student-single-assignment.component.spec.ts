import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSingleAssignmentComponent } from './student-single-assignment.component';

describe('StudentSingleAssignmentComponent', () => {
  let component: StudentSingleAssignmentComponent;
  let fixture: ComponentFixture<StudentSingleAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSingleAssignmentComponent]
    });
    fixture = TestBed.createComponent(StudentSingleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
