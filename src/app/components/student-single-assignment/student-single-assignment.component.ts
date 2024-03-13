import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStudentAssignments } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectStudentAssignments,
  selectStudentAssignmentsLoading
} from 'src/app/store/selectors/auth.selectors';
import { AssignmentStudent } from 'src/app/types';

@Component({
  selector: 'app-student-single-assignment',
  templateUrl: './student-single-assignment.component.html',
  styleUrls: ['./student-single-assignment.component.css']
})
export class StudentSingleAssignmentComponent {
  data: AssignmentStudent[];
  assignmentId = this.route.snapshot.params['assignmentId'];
  isLoading$: Observable<boolean> = this.store.select(selectStudentAssignmentsLoading);
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadStudentAssignments());
    this.store.select(selectStudentAssignments).subscribe((data) => {
      if (data) {
        this.data = data.filter((item) => item.assignmentId === this.assignmentId);
      }
    });
  }
}
