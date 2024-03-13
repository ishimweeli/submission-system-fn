/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Delete, deleteDraft } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectAssignmentStatus,
  selectDeleteAssignment
} from 'src/app/store/selectors/auth.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @Input() id: number = 0;
  loading$: Observable<boolean> = this.store.select(selectDeleteAssignment);
  status$: Observable<string> = this.store.select(selectAssignmentStatus);
  url: string = this.router.url;
  constructor(
    private modal: NgbActiveModal,
    private store: Store<AppState>,
    private router: Router,
    private toast: ToastrService
  ) {}
  dismiss() {
    this.modal.dismiss();
  }
  Delete(id: number) {
    if (this.url.includes('/lecturer/drafts')) {
      this.store.dispatch(deleteDraft({ id }));
      this.status$.subscribe((status) => {
        if (status === 'success') {
          this.modal.close(true);
          this.toast.success('Draft deleted successfully');
        }
      });
    } else {
      this.store.dispatch(Delete({ id }));
      this.status$.subscribe((status) => {
        if (status === 'success') {
          this.modal.close(true);
          this.toast.success('Assignment deleted successfully');
        }
      });
    }
  }
}
