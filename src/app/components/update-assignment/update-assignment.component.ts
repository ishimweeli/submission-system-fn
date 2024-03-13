import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { updateAssignment, updateDraft } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectAssignmentError,
  selectAssignmentStatus,
  selectAssignments,
  selectDeleteAssignment
} from 'src/app/store/selectors/auth.selectors';
import { assignment } from 'src/app/types';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent {
  public editor = ClassicEditor;
  @Input() id: string = '';
  isLoading$: Observable<boolean> = this.store.select(selectDeleteAssignment);
  status$: Observable<string> = this.store.select(selectAssignmentStatus);
  error$: Observable<string> = this.store.select(selectAssignmentError);
  url: string = this.router.url;
  minDate:string = new Date().toISOString().split('T')[0]
  constructor(
    private modal: NgbActiveModal,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {
    this.updateForm = this.createFormGroup();
  }
  updateForm: FormGroup;
  currentItem: assignment[] = [];
  dismiss() {
    this.modal.dismiss();
  }
  ngOnInit() {
    this.store.select(selectAssignments).subscribe((item) => {
      if (item) {
        this.currentItem = item;
        const assign = item.filter((item) => item.assignmentId === this.id);
        const d = assign.map((item) => {
          return {
            description: item.description,
            title: item.title,
            deadline: item.deadline
          };
        });
        const { title, description, deadline } = d[0];
        this.updateForm.patchValue({
          title: title,
          description: description,
          deadline: deadline
        });
      }
    });
  }
  formValue(): { title: string; description: string; deadline: Date } {
    const desc = this.updateForm.controls['description'].value;
    const title = this.updateForm.controls['title'].value;
    const deadLine = this.updateForm.controls['deadline'].value;
    const temp = document.createElement('div');
    temp.innerHTML = desc;
    const description = temp.textContent || temp.innerHTML;

    return {
      title: title,
      description: description,
      deadline: deadLine
    };
  }
  patchData(id: string) {
    const assgnment = this.formValue();
    this.store.dispatch(updateAssignment({ id: id, assignment: assgnment }));
    this.status$.subscribe((status) => {
      if (status === 'success') {
        this.modal.close(true);
        this.toast.success('Assignment updated successfully');
      }
    });
  }

  publish(assignmentId: string) {
    this.store.dispatch(updateDraft({ assignmentId }));
    this.status$.subscribe((status) => {
      if (status === 'success') {
        this.modal.close(true);
        this.toast.success('Assignment updated successfully');
      }
    });
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }
}
