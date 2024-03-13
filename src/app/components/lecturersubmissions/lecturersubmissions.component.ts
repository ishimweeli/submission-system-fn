import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadAssignmentSubmissions } from 'src/app/store/actions/auth.actions';
import { AppState, selectassignmentSubmission } from 'src/app/store/selectors/auth.selectors';
import { LecturerSubmissionsData } from 'src/app/types';

@Component({
  selector: 'app-lecturersubmissions',
  templateUrl: './lecturersubmissions.component.html',
  styleUrls: ['./lecturersubmissions.component.css']
})
export class LecturersubmissionsComponent {
  createAssignment() {
    this.custom.CreateAssignment();
  }
 
  data$: Observable<LecturerSubmissionsData> = this.store.select(selectassignmentSubmission);
  isLoading$: Observable<boolean> = this.store.select(
    (store) => store.assignmentSubmission.isLoading
  );
  error$: Observable<string> = this.store.select(
    (store) => store.assignmentSubmission.error.error.message
  );
  searchText: string = '';
  constructor(
    private store: Store<AppState>,
    private custom: CustomValidatorsService
  ) {}
  ngOnInit() {
    this.store.dispatch(loadAssignmentSubmissions());
    this.store.select(selectassignmentSubmission)
  }
}
