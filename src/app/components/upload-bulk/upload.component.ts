/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  bulkLecture,
  bulkStudent,
  loadStudents,
  loadlecture
} from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectBulkError,
  selectBulkLoading,
  selectBulkStatus
} from 'src/app/store/selectors/auth.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadBulkComponent {
  page: number = 1;
  loading$: Observable<boolean> = this.store.select(selectBulkLoading);
  error$: Observable<string> = this.store.select(selectBulkError);
  status$: Observable<string> = this.store.select(selectBulkStatus);
  userRole: string = '';
  urls: string = this.route.url;
  files: File | null = null;
  unsubscribe$ = new Subject();
  constructor(
    private activeModal: NgbActiveModal,
    private route: Router,
    private store: Store<AppState>,
    private toast: ToastrService
  ) {}
  dismiss() {
    this.activeModal.dismiss();
  }

  fileUpload(files: File) {
    this.files = files;
  }

  onChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      this.files = file;
    }
  }

  async onUpload() {
    let actionType: any = '';
    let userRole: string = 'STUDENT';
    if (this.files) {
      if (this.urls.includes('students')) {
        actionType = bulkStudent;
        userRole = 'STUDENT';
      } else if (this.urls.includes('lectures')) {
        actionType = bulkLecture;
        userRole = 'LECTURER';
      }

      if (actionType && userRole) {
        this.store.dispatch(actionType({ usersBulk: { file: this.files }, userRole }));
      }
    }
    this.status$.subscribe((status) => {
      if (status === 'success' && this.urls.includes('students')) {
        this.activeModal.close(true);
        this.toast.success('File uploaded successfully');
        this.store.dispatch(loadStudents({ page: this.page }));
      } else if (status === 'success' && this.urls.includes('lectures')) {
        this.activeModal.close(true);
        this.store.dispatch(loadlecture({ page: this.page }));
      }
      return;
    });
  }
  onPagechange(page: number) {
    this.page = page;
  }
}
