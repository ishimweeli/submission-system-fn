/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import {
  createAssignment,
  createAssignmentDraft,
  inviteStudent,
  loadAssignment,
  loadStudents
} from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectCreateDraftError,
  selectCreateDraftLoading,
  selectDraftStatus,
  selectSaveAssignment,
  selectStudent,
  selectInviteLoading,
  selectSaveStatus,
  selectInviteStatus,
  selectSaveError
} from 'src/app/store/selectors/auth.selectors';
import { StudentData, assignment } from 'src/app/types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent {
  page: number = 1;

  public editor = ClassicEditor;

  searchText: string = '';
  isLoading$: Observable<boolean> = this.store.select(selectCreateDraftLoading);
  isSaveLoading$: Observable<boolean> = this.store.select(
    (state) => state.createAssignment.isLoading
  );

  error$: Observable<string> = this.store.select(selectCreateDraftError);
  draftStatus$: Observable<string> = this.store.select(selectDraftStatus);
  students$: Observable<StudentData[]> = this.store.select(selectStudent);
  LoadingStudent$: Observable<boolean> = this.store.select((state) => state.students.isLoading);
  inviteLoading$: Observable<boolean> = this.store.select(selectInviteLoading);
  assignmentId$: Observable<assignment> = this.store.select(selectSaveAssignment);
  SaveStatus$: Observable<string> = this.store.select(selectSaveStatus);
  inviteStatus$: Observable<string> = this.store.select(selectInviteStatus);
  saveError$: Observable<string> = this.store.select(selectSaveError);
  assignmentsForm: FormGroup;
  CheckForm: FormGroup;
  colors: string[] = [];
  Loading$: Observable<boolean> = combineLatest([this.inviteLoading$, this.isSaveLoading$]).pipe(
    map(([inviteLoading, saveLoading]) => inviteLoading || saveLoading)
  );
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private toast: ToastrService
  ) {
    this.CheckForm = this.fb.group({
      studentIds: this.fb.array([])
    });
  }
  createForm(): FormGroup {
    return this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadLine: [null, [Validators.required]]
    });
  }

  formValue(): { title: string; description: string; deadline: Date } {
    const desc = this.assignmentsForm.controls['description'].value;
    const title = this.assignmentsForm.controls['title'].value;
    const deadLine = this.assignmentsForm.controls['deadLine'].value;
    const temp = document.createElement('div');
    temp.innerHTML = desc;
    const description = temp.textContent || temp.innerHTML;

    return {
      title: title,
      description: description,
      deadline: deadLine
    };
  }
  onPublish() {
    if (this.assignmentsForm.valid) {
      const assignment = this.formValue();
      this.store.dispatch(createAssignment(assignment));
      this.SaveStatus$.pipe(
        tap((status) => {
          if (status === 'success') {
            this.assignmentId$
              .pipe(
                switchMap((assignment) => {
                  if (assignment) {
                    const assignmentId = assignment.assignmentId;
                    let studentIds = this.CheckForm.controls['studentIds'].value;
                    studentIds = studentIds.map((number: string) => {
                      return parseInt(number, 10);
                    });
                    this.store.dispatch(
                      inviteStudent({ studentIds: studentIds, assignmentId: assignmentId })
                    );
                  }
                  this.inviteStatus$.subscribe((status) => {
                    if (status === 'success') {
                      this.activeModal.close(true);
                      this.toast.success('Assignment created successfully');
                      this.store.dispatch(loadAssignment({ sortBy: 'date' }));
                    }
                  });
                  return of(null);
                })
              )
              .subscribe();
          }
        })
      ).subscribe();
    }
  }
  ngOnInit() {
    this.assignmentsForm = this.createForm();
    this.store.dispatch(loadStudents({ page: this.page }));
    this.students$.subscribe((data) => {
      if (data) {
        data.forEach((_, index) => {
          this.colors[index] = this.getRandomColor();
        });
      }
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
  onDraft() {
    if (this.assignmentsForm.valid) {
      const assignment = this.formValue();
      this.store.dispatch(createAssignmentDraft(assignment));
      this.draftStatus$.subscribe((status) => {
        if (status === 'success') {
          this.activeModal.close(true);
          this.toast.success('Draft created successfully');
        }
      });
    }
  }
  dismiss() {
    this.activeModal.dismiss();
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
