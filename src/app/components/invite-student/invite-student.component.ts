/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {
  inviteStudent,
  loadAssignment,
  loadSingleAssegnment,
  loadUnAssignedStudents
} from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectInviteStatus,
  selectUnAssignedStudents
} from 'src/app/store/selectors/auth.selectors';
import { StudentData } from 'src/app/types';

@Component({
  selector: 'app-invite-student',
  templateUrl: './invite-student.component.html',
  styleUrls: ['./invite-student.component.css']
})
export class InviteStudentComponent {
  @Input() assignmentId: string = '';
  @Input() Id: string = '';
  page: number = 1;
  searchText: string = '';

  students: StudentData[] = [];
  LoadingStudent$: Observable<boolean> = this.store.select((state) => state.students.isLoading);
  isLoading$: Observable<boolean> = this.store.select((state) => state.invite.isLoading);
  inviteStatus$: Observable<string> = this.store.select(selectInviteStatus);
  error$: Observable<string> = this.store.select((state) => state.invite.error.error.message);
  CheckForm: FormGroup;
  colors: string[] = [];
  url: string = this.route.url;
  assignment: string = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private route: Router,
    private toast: ToastrService
  ) {
    this.CheckForm = this.fb.group({
      studentIds: this.fb.array([])
    });
  }

  toggleStudent(event: any) {
    const studentIds: FormArray = this.CheckForm.controls['studentIds'] as FormArray;
    if (event.target.checked) {
      studentIds.push(new FormControl(event.target.value));
    } else {
      const index = studentIds.controls.findIndex((item) => item.value === event.target.value);
      studentIds.removeAt(index);
    }
  }

  ngOnInit() {
    this.loadItems(this.Id);
  }
  loadItems(assingmentId: string) {
    this.store.dispatch(loadUnAssignedStudents({ assignmentId: assingmentId }));
    this.store.select(selectUnAssignedStudents).subscribe((data) => {
      if (data) {
        this.students = data.filter((item) => item.invited === true);
        data.forEach((_, index) => {
          this.colors[index] = this.getRandomColor();
        });
      }
    });
  }

  inviteStudent(assignmentId: string) {
    if (this.CheckForm.valid) {
      let studentIds = this.CheckForm.controls['studentIds'].value;
      studentIds = studentIds.map((item: string) => {
        return parseInt(item, 10);
      });
      this.store.dispatch(inviteStudent({ studentIds: studentIds, assignmentId: assignmentId }));
      this.inviteStatus$.subscribe((status) => {
        if (status === 'success') {
          if (!this.url.includes('/assignment')) {
            this.modal.close(true);
            this.store.dispatch(loadAssignment({ sortBy: 'data' }));
            this.store.dispatch(loadSingleAssegnment({ assignmentId: assignmentId }));
          } else {
            this.modal.close(true);
            this.store.dispatch(loadSingleAssegnment({ assignmentId: assignmentId }));
            this.toast.success('Invited successfully');
          }
        }
      });
    }
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  dismiss() {
    this.modal.dismiss();
  }
}
