import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadAssignment } from 'src/app/store/actions/auth.actions';
import { AppState, selectAssignmentLoading, selectAssignments } from 'src/app/store/selectors/auth.selectors';
import { assignment } from 'src/app/types';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent {
  assignment$: Observable<assignment[]> = this.store.select(selectAssignments);
  isloading$:Observable<boolean> = this.store.select(selectAssignmentLoading)
  assinment: assignment[] = [];
  constructor(
    private store: Store<AppState>,
    private modalService: CustomValidatorsService
  ) {}
  ngOnInit() {
    this.store.dispatch(loadAssignment({ sortBy: 'title' }));
    this.assignment$.subscribe(data =>{
      this.assinment = data.filter(item => item.isDraft === true)
    })
  }
  deleteDraft(id: number) {
    this.modalService.DeleteAssignment(id);
  }
  updateDraft(id: string) {
    this.modalService.updateAssignment(id);
  }
}
