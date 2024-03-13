import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadAssignment } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectAssignmentLoading,
  selectAssignments
} from 'src/app/store/selectors/auth.selectors';
import { assignment } from 'src/app/types';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent {
  assignment: assignment[] = [];
  sortby: string = '';
  isLoading$: Observable<boolean> = this.store.select(selectAssignmentLoading);
  assingment$: Observable<assignment[]> = this.store.select(selectAssignments);
  searchText: string = '';
  selectForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private customService: CustomValidatorsService,
    private fb: FormBuilder
  ) {
    this.selectForm = this.fb.group({
      sortBy: ['sort-by', [Validators.required]]
    });
  }

  ngOnInit() {
    this.store.dispatch(loadAssignment({ sortBy: 'date' }));
    this.store.select(selectAssignments).subscribe((data) => {
      this.assignment = data.filter((item) => item.isDraft === false);
    });
  }
  onSelect() {
    this.store.dispatch(loadAssignment(this.selectForm.value));
  }
  createAssignment() {
    this.customService.CreateAssignment();
  }
  DeleteFailureAssignment(id: number) {
    this.customService.DeleteAssignment(id);
  }
  updateAssignment(id: string) {
    this.customService.updateAssignment(id);
  }

  inviteStudent(assignmentId: string,id:string) {
    this.customService.inviteStudent(assignmentId,id);
  }
  copyToclipBoard(text: string) {
    this.customService.copyToClipBoard(text);
  }
}
