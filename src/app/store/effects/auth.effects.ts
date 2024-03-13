import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/Auth.service';
import {
  Delete,
  DeleteFailure,
  DeleteSuccess,
  bulkLecture,
  bulkLectureFailure,
  bulkLectureSuccess,
  bulkStudent,
  bulkStudentFailure,
  bulkStudentSuccess,
  createAssignment,
  createAssignmentDraft,
  createAssignmentDraftFailure,
  createAssignmentDraftSuccess,
  createAssignmentFailure,
  createAssignmentSuccess,
  deleteDraft,
  deleteDraftFailure,
  deleteDraftSuccess,
  downloadProject,
  downloadProjectFailure,
  downloadProjectSuccess,
  downloadSnapshot,
  downloadSnapshotFailure,
  downloadSnapshotSuccess,
  inviteStudent,
  inviteStudentFailure,
  inviteStudentSuccess,
  loadAssignment,
  loadAssignmentFailure,
  loadAssignmentSubmissions,
  loadAssignmentSubmissionsFailure,
  loadAssignmentSubmissionsSuccess,
  loadAssignmentSuccess,
  loadSingleAssegnment,
  loadSingleAssegnmentFailure,
  loadSingleAssegnmentSuccess,
  loadStudentAssignments,
  loadStudentAssignmentsError,
  loadStudentAssignmentsSuccess,
  loadStudents,
  loadStudentsFailure,
  loadStudentsSuccess,
  loadUnAssignedStudents,
  loadUnAssignedStudentsFailure,
  loadUnAssignedStudentsSuccess,
  loadSubmissionsWithExractedFiles,
  loadSubmissionsWithExractedFilesFailure,
  loadSubmissionsWithExractedFilesSuccess,
  loadlecture,
  loadlectureFailure,
  loadlectureSucces,
  login,
  loginFailure,
  loginSuccess,
  resetAction,
  resetPasswordFailure,
  resetPasswordSuccess,
  updateAssignment,
  updateAssignmentFailure,
  updateAssignmentSuccess,
  updateDraft,
  updateDraftFailure,
  updateDraftSuccess,
  loadDashboard,
  loadDashboardSuccess,
  loadDashboardFailure
} from '../actions/auth.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  createLecture,
  createLectureFailure,
  createLectureSuccess,
  createStudent,
  createStudentFailure,
  createStudentSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from '../actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map((message) => logoutSuccess({ message })),
          catchError((error) => of(logoutFailure({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((data) =>
        this.authService.login(data).pipe(
          map((userData) =>
            loginSuccess({
              userData
            })
          ),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );
  createLecture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLecture),
      switchMap((data) =>
        this.authService.createLecture(data).pipe(
          map((user) => createLectureSuccess({ user })),
          catchError((error) => of(createLectureFailure({ error })))
        )
      )
    )
  );
  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createStudent),
      switchMap((data) =>
        this.authService.createStudent(data).pipe(
          map((user) => createStudentSuccess({ user })),
          catchError((error) => of(createStudentFailure({ error })))
        )
      )
    )
  );

  students$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStudents),
      switchMap((action) =>
        this.authService.getStudents(action.page).pipe(
          map((student) => loadStudentsSuccess({ student })),
          catchError((error) => of(loadStudentsFailure({ error })))
        )
      )
    )
  );
  unAssignedstudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUnAssignedStudents),
      switchMap((action) =>
        this.authService.unAssingnedstudentAssignments(action.assignmentId).pipe(
          map((student) => loadUnAssignedStudentsSuccess({ student })),
          catchError((error) => of(loadUnAssignedStudentsFailure({ error })))
        )
      )
    )
  );
  lecturer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadlecture),
      switchMap((page) =>
        this.authService.getLectures(page.page).pipe(
          map((lecture) => loadlectureSucces({ lecture: lecture })),
          catchError((error) => of(loadlectureFailure({ error }))) 
        )
      )
    )
  );

  bulkStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bulkStudent),
      switchMap((action) =>
        this.authService.bulkStudent(action.usersBulk.file, action.userRole).pipe(
          map((message) => bulkStudentSuccess({ message })),
          catchError((error) => of(bulkStudentFailure({ error })))
        )
      )
    )
  );
  bulkLectures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bulkLecture),
      switchMap((action) =>
        this.authService.bulkLecture(action.usersBulk.file, action.userRole).pipe(
          map((message) => bulkLectureSuccess({ message })),
          catchError((error) => of(bulkLectureFailure({ error })))
        )
      )
    )
  );
  ResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetAction),
      switchMap((action) =>
        this.authService.resetPassword(action.newPassword).pipe(
          map((message) => resetPasswordSuccess(message)),
          catchError((error) => of(resetPasswordFailure({ error })))
        )
      )
    )
  );

  getAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssignment),
      switchMap((action) =>
        this.authService.getAssignment(action.sortBy).pipe(
          map((assignments) => loadAssignmentSuccess({ assignments })),
          catchError((error) => of(loadAssignmentFailure({ error })))
        )
      )
    )
  );
  createAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAssignment),
      switchMap((data) =>
        this.authService
          .createAssignment({
            title: data.title,
            deadline: data.deadline,
            description: data.description
          })
          .pipe(
            map((assignment) => createAssignmentSuccess({ assignment })),
            catchError((error) => of(createAssignmentFailure({ error })))
          )
      )
    )
  );
  publishAssignmnet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inviteStudent),
      switchMap((data) =>
        this.authService
          .publishAssignment({
            assignmentId: data.assignmentId,
            studentIds: data.studentIds
          })
          .pipe(
            map((assignment) =>
              inviteStudentSuccess({ message: assignment.message, status: assignment.status })
            ),
            catchError((error) => of(inviteStudentFailure({ error })))
          )
      )
    )
  );
  createDraftAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAssignmentDraft),
      switchMap((data) =>
        this.authService
          .createAssignmentDraft({
            title: data.title,
            deadline: data.deadline,
            description: data.description
          })
          .pipe(
            map((assignment) => createAssignmentDraftSuccess({ assignment })),
            catchError((error) => of(createAssignmentDraftFailure({ error })))
          )
      )
    )
  );

  Delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Delete),
      mergeMap((action) =>
        this.authService.deleteAssignment(action.id).pipe(
          map((action) => DeleteSuccess({ status: action.status, message: action.message })),
          catchError((error) => of(DeleteFailure({ error })))
        )
      )
    )
  );

  updateAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAssignment),
      switchMap((data) =>
        this.authService
          .updateAssignment(
            {
              title: data.assignment.title,
              deadline: data.assignment.deadline,
              description: data.assignment.description
            },
            data.id
          )
          .pipe(
            map((assignment) => updateAssignmentSuccess({ assignment })),
            catchError((error) => of(updateAssignmentFailure({ error })))
          )
      )
    )
  );
  studentAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStudentAssignments),
      switchMap(() =>
        this.authService.studentAssignments().pipe(
          map((assignment) => loadStudentAssignmentsSuccess({ assignment })),
          catchError((error) => of(loadStudentAssignmentsError({ error })))
        )
      )
    )
  );
  DeleteDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDraft),
      mergeMap((action) =>
        this.authService.deleteDraft(action.id).pipe(
          map((action) => deleteDraftSuccess({ status: action.status, message: action.message })),
          catchError((error) => of(deleteDraftFailure({ error })))
        )
      )
    )
  );
  updateDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDraft),
      mergeMap((action) =>
        this.authService.updateIsDraft(action.assignmentId).pipe(
          map((action) => updateDraftSuccess({ status: action.status, message: action.message })),
          catchError((error) => of(updateDraftFailure({ error })))
        )
      )
    )
  );
  singleAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSingleAssegnment),
      mergeMap((action) =>
        this.authService.singleAssegnment(action.assignmentId).pipe(
          map((assignment) => loadSingleAssegnmentSuccess({ assignment })),
          catchError((error) => of(loadSingleAssegnmentFailure({ error })))
        )
      )
    )
  );
  AssignmentSubmissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssignmentSubmissions),
      mergeMap(() =>
        this.authService.lecturerSubmissions().pipe(
          map((assignment) => loadAssignmentSubmissionsSuccess({ assignment })),
          catchError((error) => of(loadAssignmentSubmissionsFailure({ error })))
        )
      )
    )
  );
  downloadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadProject),
      mergeMap((action) =>
        this.authService.downloadFile(action.submissionId).pipe(
          map((action) => downloadProjectSuccess({ assignment: action })),
          catchError((error) => of(downloadProjectFailure({ error })))
        )
      )
    )
  );
  downloadSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadSnapshot),
      mergeMap((action) =>
        this.authService.downloadSnapshot(action.submissionId, action.snapshotId).pipe(
          map((action) => downloadSnapshotSuccess({ assignment: action })),
          catchError((error) => of(downloadSnapshotFailure({ error })))
        )
      )
    )
  );
  submissionWithExtractedFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSubmissionsWithExractedFiles),
      mergeMap((action) =>
        this.authService.submissionWithExtractedFiles(action.studentId).pipe(
          map((action) => loadSubmissionsWithExractedFilesSuccess({ submission: action })),
          catchError((error) => of(loadSubmissionsWithExractedFilesFailure({ error })))
        )
      )
    )
  );
  DashboardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboard),
      mergeMap(() =>
        this.authService.dashboardData().pipe(
          map((action) => loadDashboardSuccess({ data: action })),
          catchError((error) => of(loadDashboardFailure({ error })))
        )
      )
    )
  );
}
