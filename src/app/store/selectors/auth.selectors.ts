import { createSelector } from '@ngrx/store';
import { dataState, download, downloadSubmission, loginState } from '../reducers/auth.reducer';
import {
  AssignmentStudentState,
  AssignmentSubmissionState,
  InviteState,
  LectureState,
  SaveAssignmentState,
  SubmissionExtracedState,
  assignmentAssignedState,
  assignmentState,
  bulkState,
  createAssignmentState,
  studentState,
  unAssignState
} from 'src/app/types';
import { CreateState } from 'src/app/types';

export interface AppState {
  login: loginState;
  students: studentState;
  lecturers: LectureState;
  createLecturer: CreateState;
  createStudent: CreateState;
  bulk: bulkState;
  resetPassword: { message: string; isLoading: boolean; error: string };
  assignments: assignmentState;
  createAssignment: SaveAssignmentState;
  createDraft: createAssignmentState;
  invite: InviteState;
  StudentAssignment: AssignmentStudentState;
  singleAssegnment: assignmentAssignedState;
  unAssigned: unAssignState;
  assignmentSubmission: AssignmentSubmissionState;
  downloadFile: download;
  submission: SubmissionExtracedState;
  dashboardData: dataState;
  downloadSubmission: downloadSubmission;
}
const selectLogin = (state: AppState) => state.login;
const selectStudents = (state: AppState) => state.students;
const selectLecturer = (state: AppState) => state.lecturers;
const selectBulk = (state: AppState) => state.bulk;
const selectReset = (state: AppState) => state.resetPassword;
const selectAssignment = (state: AppState) => state.assignments;
const selectCreateAssignment = (state: AppState) => state.createAssignment;
const selectCreateAssignmentDraft = (state: AppState) => state.createDraft;
const selectinvite = (state: AppState) => state.invite;
const selectStudentAssignment = (state: AppState) => state.StudentAssignment;
const selectSingleAssegnement = (state: AppState) => state.singleAssegnment;
const selectUnassigend = (state: AppState) => state.unAssigned;
const selectSubmissions = (state: AppState) => state.assignmentSubmission;
const selectDashboard = (state: AppState) => state.dashboardData;

export const selectToken = createSelector(selectLogin, (state: loginState) => state.user);
export const selectIsLoading = createSelector(selectLogin, (state: loginState) => state.isLoading);
export const selectError = createSelector(
  selectLogin,
  (state: loginState) => state.error.error.message
);

export const selectStudent = createSelector(
  selectStudents,
  (state: studentState) => state.students.data.lecturers
);
export const selectlecturers = createSelector(
  selectLecturer,
  (state: LectureState) => state.lecturer.data
);

export const selectBulkError = createSelector(
  selectBulk,
  (state: bulkState) => state.error.error.message
);

export const selectBulkStatus = createSelector(
  selectBulk,
  (state: bulkState) => state.message.status
);

export const selectBulkLoading = createSelector(selectBulk, (state: bulkState) => state.loading);

export const selectResetLoading = createSelector(selectReset, (state) => state.isLoading);
export const selectResetError = createSelector(selectReset, (state) => state.error);
export const selectAssignments = createSelector(
  selectAssignment,
  (state: assignmentState) => state.assignment.data
);
export const selectAssignmentLoading = createSelector(
  selectAssignment,
  (state: assignmentState) => state.isLoading
);
export const selectSaveAssignment = createSelector(
  selectCreateAssignment,
  (state: SaveAssignmentState) => state.assignment.assignment
);
export const selectSaveError = createSelector(
  selectCreateAssignment,
  (state: SaveAssignmentState) => state.error.error.message
);
export const selectSaveStatus = createSelector(
  selectCreateAssignment,
  (state: SaveAssignmentState) => state.assignment.status
);
export const selectCreateDraftLoading = createSelector(
  selectCreateAssignmentDraft,
  (state: createAssignmentState) => state.isLoading
);
export const selectCreateDraftError = createSelector(
  selectCreateAssignmentDraft,
  (state: createAssignmentState) => state.error.error.message
);
export const selectDraftStatus = createSelector(
  selectCreateAssignmentDraft,
  (state: createAssignmentState) => state.assignment.status
);

export const selectInviteLoading = createSelector(
  selectinvite,
  (state: InviteState) => state.isLoading
);

export const selectInviteStatus = createSelector(
  selectinvite,
  (state: InviteState) => state.status
);

export const selectAssignmentStatus = createSelector(
  selectAssignment,
  (state: assignmentState) => state.status
);
export const selectDeleteAssignment = createSelector(
  selectAssignment,
  (State: assignmentState) => State.deleteLoading
);
export const selectStudentAssignments = createSelector(
  selectStudentAssignment,
  (state: AssignmentStudentState) => state.data.data
);
export const selectStudentAssignmentsLoading = createSelector(
  selectStudentAssignment,
  (state: AssignmentStudentState) => state.isLoading
);
export const selectStudentAssignmentsError = createSelector(
  selectStudentAssignment,
  (state: AssignmentStudentState) => state.error.error.message
);

export const selectAssignmentError = createSelector(
  selectAssignment,
  (state: assignmentState) => state.error.error.message
);
export const selectSingleAssegnmentAssignment = createSelector(
  selectSingleAssegnement,
  (state: assignmentAssignedState) => state.data
);
export const selectSingleAssegnmentStudents = createSelector(
  selectSingleAssegnement,
  (state: assignmentAssignedState) => state.data.data.AssignmentToUser
);
export const selectSingleAssegnmentLoading = createSelector(
  selectSingleAssegnement,
  (state: assignmentAssignedState) => state.isLoading
);
export const selectSingleAssegnmentError = createSelector(
  selectSingleAssegnement,
  (state: assignmentAssignedState) => state.error.error.message
);

export const selectUnAssignedStudents = createSelector(
  selectUnassigend,
  (state: unAssignState) => state.students.data
);
export const selectUnassignedLoading = createSelector(
  selectUnassigend,
  (state: unAssignState) => state.isLoading
);
export const selectassignmentSubmission = createSelector(
  selectSubmissions,
  (state: AssignmentSubmissionState) => state.data
);
export const selectDashboar = createSelector(selectDashboard, (state: dataState) => state.data);
