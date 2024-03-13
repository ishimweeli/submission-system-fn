import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createLecture, loadlecture } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/selectors/auth.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createLecture',
  templateUrl: './createLecture.component.html',
  styleUrls: ['./createLecture.component.css']
})
export class CreateLectureComponent {
  page: number = 1;
  @Input() title: string = '';
  Form: FormGroup = this.createForm();
  loading$: Observable<boolean> = this.store.select((state) => state.createLecturer.Loading);
  error$: Observable<string> = this.store.select((state) => state.createLecturer.error);
  status$: Observable<string> = this.store.select((state) => state.createLecturer.status);
  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}
  dismiss() {
    this.activeModal.close(false);
  }
  create() {
    if (this.Form.invalid) {
      return;
    }
    this.store.dispatch(createLecture(this.Form.value));
    this.status$.subscribe((status) => {
      if (status === 'success') {
        this.activeModal.close(true);
        this.store.dispatch(loadlecture({ page: this.page }));
        this.toast.success('Lecturer created successfully');
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      role: 'LECTURER'
    });
  }

  getInputControl(control: string): boolean {
    const controlName = this.Form.controls[control];
    return controlName.invalid && (controlName.dirty || controlName.touched);
  }
}
