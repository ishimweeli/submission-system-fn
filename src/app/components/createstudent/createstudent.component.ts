import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createStudent, loadStudents } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/selectors/auth.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createStudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreatestudentComponent {
  page: number = 1;
  @Input() title: string = 'Tell us a little about the student you are adding';
  Form: FormGroup = this.createForm();
  loading$: Observable<boolean> = this.store.select((state) => state.createStudent.Loading);
  status$: Observable<string> = this.store.select((state) => state.createStudent.status);
  error$: Observable<string> = this.store.select((state) => state.createStudent.error);
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
    this.store.dispatch(createStudent(this.Form.value));
    this.status$.subscribe((status) => {
      if (status === 'success') {
        this.activeModal.close(true);
        this.toast.success('Student created successfully');
        this.store.dispatch(loadStudents({ page: this.page }));
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      role: 'STUDENT'
    });
  }

  getInputControl(control: string) {
    const controlName = this.Form.controls[control];
    return controlName.invalid && (controlName.dirty || controlName.touched);
  }
}
