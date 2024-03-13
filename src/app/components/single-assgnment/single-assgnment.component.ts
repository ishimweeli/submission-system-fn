import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadSingleAssegnment } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectSingleAssegnmentAssignment,
  selectSingleAssegnmentLoading
} from 'src/app/store/selectors/auth.selectors';
import { assignmentAssignedData } from 'src/app/types';

@Component({
  selector: 'app-single-assgnment',
  templateUrl: './single-assgnment.component.html',
  styleUrls: ['./single-assgnment.component.css']
})
export class SingleAssgnmentComponent {
  copy(text: string) {
    this.modal.copyToClipBoard(text);
  }
  assingment$: Observable<assignmentAssignedData> = this.store.select(
    selectSingleAssegnmentAssignment
  );
  isLoading$: Observable<boolean> = this.store.select(selectSingleAssegnmentLoading);
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private modal: CustomValidatorsService
  ) {}
  assingmentId: string;
  ngOnInit() {
    this.assingmentId = this.route.snapshot.params['assignmentId'];
    this.store.dispatch(loadSingleAssegnment({ assignmentId: this.assingmentId }));
  }
  invite(assignmentId: string, id: string) {
    this.modal.inviteStudent(assignmentId, id);
  }
}
