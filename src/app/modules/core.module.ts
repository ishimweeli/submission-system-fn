import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  AssignmentReducer,
  DashboardDataReducer,
  InviteReducer,
  LoginReducer,
  StudentAssignment,
  UnAssignedstudentReducer,
  assignmentSubmissionReducer,
  bulkReducer,
  createAssignmentDraftReducer,
  createAssignmentReducer,
  createLectureReducer,
  createStudentReducer,
  downloadReducer,
  downloadSubmissionReducer,
  lectureReducer,
  resetPasswordReducer,
  singleAssignmentReducer,
  studentReducer,
  submissionExtractedFilesReducer
} from 'src/app/store/reducers/auth.reducer';
import { AdminDashboardComponent } from 'src/app/components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'src/app/components/table/table.component';
import { StudentsComponent } from 'src/app/components/students/students.component';
import { FilterPipe, OrderByPipe, TrimNamePipe, TrimPipe } from 'src/app/pipes/trim.pipe';
import { LectureComponent } from 'src/app/components/lecture/lecture.component';
import { AdminComponent } from 'src/app/components/admindashboard/admindashboard.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { CreateLectureComponent } from '../components/createLecture/createLecture.component';
import { CreatestudentComponent } from '../components/createstudent/createstudent.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { UploadBulkComponent } from '../components/upload-bulk/upload.component';
import { AppDrag } from '../directives/upload-directive';
import { LectureDashboardComponent } from '../components/lecture-dashboard/lecture-dashboard.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { AssignmentComponent } from '../components/assignment/assignment.component';
import { ListAssignmentComponent } from '../components/list-assignment/list-assignment.component';
import { SingleAssgnmentComponent } from '../components/single-assgnment/single-assgnment.component';
import { CreateAssignmentComponent } from '../components/create-assignment/create-assignment.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from '../components/delete/delete.component';
import { UpdateAssignmentComponent } from '../components/update-assignment/update-assignment.component';
import { InviteStudentComponent } from '../components/invite-student/invite-student.component';
import { DraftComponent } from '../components/draft/draft.component';
import { LectureStudentsComponent } from '../components/lecture-students/lecture-students.component';
import { StudentDashboardComponent } from '../components/student-dashboard/student-dashboard.component';
import { StudentAssignmentsComponent } from '../components/student-assignments/student-assignments.component';
import { NoresourcefoundComponent } from '../components/noresourcefound/noresourcefound.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';
import { StudentSingleAssignmentComponent } from '../components/student-single-assignment/student-single-assignment.component';
import { StudentSubmissionComponent } from '../components/student-submission/student-submission.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgChartsModule } from 'ng2-charts';
import { LecturersubmissionsComponent } from '../components/lecturersubmissions/lecturersubmissions.component';
import { SingleSubmissionComponent } from '../components/single-submission/single-submission.component';
import { DownloadComponent } from '../components/download/download.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashboardComponent,
    LogoutComponent,
    TableComponent,
    StudentsComponent,
    TrimPipe,
    LectureComponent,
    AdminComponent,
    CardComponent,
    CreateLectureComponent,
    CreatestudentComponent,
    SpinnerComponent,
    UploadBulkComponent,
    AppDrag,
    LectureDashboardComponent,
    ResetPasswordComponent,
    AssignmentComponent,
    ListAssignmentComponent,
    SingleAssgnmentComponent,
    InviteStudentComponent,
    SingleAssgnmentComponent,
    CreateAssignmentComponent,
    FilterPipe,
    DeleteComponent,
    UpdateAssignmentComponent,
    DraftComponent,
    LectureStudentsComponent,
    StudentDashboardComponent,
    StudentAssignmentsComponent,
    NoresourcefoundComponent,
    OrderByPipe,
    StudentSingleAssignmentComponent,
    StudentSubmissionComponent,
    LecturersubmissionsComponent,
    TrimNamePipe,
    SingleSubmissionComponent,
    DownloadComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    CKEditorModule,
    ClipboardModule,
    NgChartsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatMenuModule,
    TreeViewModule,
    AngularEditorModule,
    StoreModule.forFeature('login', LoginReducer),
    StoreModule.forFeature('students', studentReducer),
    StoreModule.forFeature('lecturers', lectureReducer),
    StoreModule.forFeature('createLecturer', createLectureReducer),
    StoreModule.forFeature('createStudent', createStudentReducer),
    StoreModule.forFeature('bulk', bulkReducer),
    StoreModule.forFeature('resetPassword', resetPasswordReducer),
    StoreModule.forFeature('assignments', AssignmentReducer),
    StoreModule.forFeature('createAssignment', createAssignmentReducer),
    StoreModule.forFeature('createDraft', createAssignmentDraftReducer),
    StoreModule.forFeature('invite', InviteReducer),
    StoreModule.forFeature('StudentAssignment', StudentAssignment),
    StoreModule.forFeature('singleAssegnment', singleAssignmentReducer),
    StoreModule.forFeature('unAssigned', UnAssignedstudentReducer),
    StoreModule.forFeature('assignmentSubmission', assignmentSubmissionReducer),
    StoreModule.forFeature('downloadFile', downloadReducer),
    StoreModule.forFeature('submission', submissionExtractedFilesReducer),
    StoreModule.forFeature('dashboardData', DashboardDataReducer),
    StoreModule.forFeature('downloadSubmission', downloadSubmissionReducer),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule,
    AdminDashboardComponent,
    DashboardComponent,
    RouterModule,
    LogoutComponent,
    NgbModule,
    HttpClientModule,
    TableComponent,
    StudentsComponent,
    TrimPipe,
    LectureComponent,
    AdminComponent,
    CardComponent,
    CreateLectureComponent,
    CreatestudentComponent,
    SpinnerComponent,
    UploadBulkComponent,
    AppDrag,
    LectureDashboardComponent,
    ResetPasswordComponent,
    AssignmentComponent,
    ListAssignmentComponent,
    SingleAssgnmentComponent,
    InviteStudentComponent,
    SingleAssgnmentComponent,
    CreateAssignmentComponent,
    FilterPipe,
    DeleteComponent,
    UpdateAssignmentComponent,
    DraftComponent,
    LectureStudentsComponent,
    StudentDashboardComponent,
    StudentAssignmentsComponent,
    NoresourcefoundComponent,
    CKEditorModule,
    BrowserModule,
    OrderByPipe,
    StudentSingleAssignmentComponent,
    StudentSubmissionComponent,
    ClipboardModule,
    NgChartsModule,
    LecturersubmissionsComponent,
    TrimNamePipe,
    SingleSubmissionComponent,
    DownloadComponent,
    ToastrModule,
    BrowserAnimationsModule,
    MatMenuModule,
    TreeViewModule,
    AngularEditorModule
  ]
})
export class CoreModule {}
