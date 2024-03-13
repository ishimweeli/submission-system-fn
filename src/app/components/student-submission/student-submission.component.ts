import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStudentAssignments } from 'src/app/store/actions/auth.actions';
import {
  selectStudentAssignments,
  selectStudentAssignmentsLoading,
  selectStudentAssignmentsError,
  AppState
} from 'src/app/store/selectors/auth.selectors';
import { AssignmentStudent } from 'src/app/types';

@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css']
})
export class StudentSubmissionComponent {
  filterForm: FormGroup;
  filterBy: 'asc' | 'desc' = 'asc';
  data$: Observable<AssignmentStudent[]> = this.store.select(selectStudentAssignments);
  isLoading$: Observable<boolean> = this.store.select(selectStudentAssignmentsLoading);
  error$: Observable<string> = this.store.select(selectStudentAssignmentsError);
  data: AssignmentStudent[] = [];
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      filter: ['filter by deadline', [Validators.required]]
    });
  }
  ngOnInit() {
    this.store.dispatch(loadStudentAssignments());
    this.data$.subscribe((data) => {
      if (data) {
        this.data = data.filter((item) => item.submitted === true);
      }
    });
  }
  onChange() {
    if (this.filterForm.valid) {
      const filter = this.filterForm.controls['filter'].value;
      this.filterBy = filter;
    }
  }
}
