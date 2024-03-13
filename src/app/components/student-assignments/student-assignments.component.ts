import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStudentAssignments } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectStudentAssignments,
  selectStudentAssignmentsError,
  selectStudentAssignmentsLoading
} from 'src/app/store/selectors/auth.selectors';
import { AssignmentStudent } from 'src/app/types';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.css']
})
export class StudentAssignmentsComponent {
  filterForm: FormGroup;
  filterBy: "asc" | "desc" = 'asc';
  data$: Observable<AssignmentStudent[]> = this.store.select(selectStudentAssignments);
  isLoading$: Observable<boolean> = this.store.select(selectStudentAssignmentsLoading);
  error$: Observable<string> = this.store.select(selectStudentAssignmentsError);
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
  }
  onChange() {
    if (this.filterForm.valid) {
      const filter = this.filterForm.controls['filter'].value;
      this.filterBy = filter;
    }
  }
}
