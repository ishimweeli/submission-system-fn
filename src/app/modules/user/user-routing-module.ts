import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from 'src/app/components/admindashboard/admindashboard.component';
import { DraftComponent } from 'src/app/components/draft/draft.component';
import { LectureDashboardComponent } from 'src/app/components/lecture-dashboard/lecture-dashboard.component';
import { LectureStudentsComponent } from 'src/app/components/lecture-students/lecture-students.component';
import { LectureComponent } from 'src/app/components/lecture/lecture.component';
import { LecturersubmissionsComponent } from 'src/app/components/lecturersubmissions/lecturersubmissions.component';
import { ListAssignmentComponent } from 'src/app/components/list-assignment/list-assignment.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { SingleAssgnmentComponent } from 'src/app/components/single-assgnment/single-assgnment.component';
import { SingleSubmissionComponent } from 'src/app/components/single-submission/single-submission.component';
import { StudentAssignmentsComponent } from 'src/app/components/student-assignments/student-assignments.component';
import { StudentDashboardComponent } from 'src/app/components/student-dashboard/student-dashboard.component';
import { StudentSingleAssignmentComponent } from 'src/app/components/student-single-assignment/student-single-assignment.component';
import { StudentSubmissionComponent } from 'src/app/components/student-submission/student-submission.component';
import { StudentsComponent } from 'src/app/components/students/students.component';
import { AuthGuard } from 'src/app/services/AuthGuard.serviec';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'lectures',
        component: LectureComponent
      }
    ]
  },
  {
    path: 'lecturer',
    component: LectureDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListAssignmentComponent
      },
      {
        path: 'assignment/:assignmentId',
        component: SingleAssgnmentComponent
      },
      {
        path: 'drafts',
        component: DraftComponent
      },
      {
        path: 'students',
        component: LectureStudentsComponent
      },
      {
        path: 'submissions',
        component: LecturersubmissionsComponent
      },
      {
        path: 'submissions/:assignmentId',
        component: SingleSubmissionComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ResetPasswordComponent
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StudentAssignmentsComponent
      },
      {
        path: 'submission',
        component: StudentSubmissionComponent
      },
      {
        path: ':assignmentId',
        component: StudentSingleAssignmentComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutesModule {}
