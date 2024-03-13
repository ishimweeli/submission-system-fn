import { createAction, props } from '@ngrx/store';
import {
  Data,
  DataLecturer,
  CreatedUser,
  Err,
  bulkData,
  AssignmentData,
  createAssignmentData,
  SaveAssignmentData,
  assign,
  UpdateAssignmentData,
  AssignmentStudentData,
  assignmentAssignedData,
  password,
  UserData,
  message,
  LecturerSubmissionsData,
  ApiResponse,
  unAssignData
} from 'src/app/types';

export const login = createAction(
  '[login] login user',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[loginSuccess] login success',
  props<{ userData: UserData }>()
);

export const loginFailure = createAction('[loginFailure] login failure', props<{ error: Err }>());

export const logout = createAction('[logout] logout user');
export const logoutFailure = createAction(
  '[logoutFailure] logout failure',
  props<{ error: string }>()
);

export const logoutSuccess = createAction(
  '[logoutSuccess] logout success',
  props<{ message: message }>()
);

export const loadStudents = createAction('[loadStudents] load students', props<{ page: number }>());
export const loadStudentsSuccess = createAction(
  '[loadStudentsSuccess] load students success',
  props<{ student: Data }>()
);
export const loadStudentsFailure = createAction(
  '[loadStudentsFailure] load students',
  props<{ error: string }>()
);
export const loadlecture = createAction('[loadLecture] load lecture', props<{ page: number }>());
export const loadlectureSucces = createAction(
  '[loadlectureSuccess] load lecture success',
  props<{ lecture: DataLecturer }>()
);
export const loadlectureFailure = createAction(
  '[loadlectureFailure] load lecturer failure',
  props<{ error: Err }>()
);

export const createLecture = createAction(
  '[createLecture] create lecture',
  props<{ email: string; firstname: string; lastname: string }>()
);
export const createLectureSuccess = createAction(
  '[createLectureSuccess] create lecture success',
  props<{ user: CreatedUser }>()
);

export const createLectureFailure = createAction(
  '[createLectureFailure] create lecture failure',
  props<{ error: Err }>()
);
export const createStudent = createAction(
  '[createStudent] create student',
  props<{ email: string; firstname: string; lastname: string }>()
);
export const createStudentSuccess = createAction(
  '[createStudentSuccess] create student success',
  props<{ user: CreatedUser }>()
);

export const createStudentFailure = createAction(
  '[createStudentFailure] create student failure',
  props<{ error: Err }>()
);

export const bulkStudent = createAction(
  '[bulkStudent] bulk student',
  props<{ usersBulk: { file: File }; userRole: string }>()
);

export const bulkStudentSuccess = createAction(
  '[bulkStudentSuccess] bulk student success',
  props<{ message: bulkData }>()
);
export const bulkStudentFailure = createAction(
  '[bulkStudentFailure] bulk student failure',
  props<{ error: Err }>()
);
export const bulkLecture = createAction(
  '[bulkLecture] bulk lecture',
  props<{ usersBulk: { file: File }; userRole: string }>()
);

export const bulkLectureSuccess = createAction(
  '[bulkLectureSuccess] bulk lecture success',
  props<{ message: bulkData }>()
);
export const bulkLectureFailure = createAction(
  '[bulkLectureFailure] bulk lecture failure',
  props<{ error: Err }>()
);

export const resetAction = createAction(
  '[resetPassword] reset password',
  props<{ newPassword: password }>()
);

export const resetPasswordSuccess = createAction(
  '[resetPasswordSuccess] reset password success',
  props<{ message: string }>()
);
export const resetPasswordFailure = createAction(
  '[resetPasswordSuccess] reset password success',
  props<{ error: string }>()
);

export const loadAssignment = createAction(
  '[loadAssignment] load assignment',
  props<{ sortBy?: string }>()
);
export const loadAssignmentSuccess = createAction(
  '[loadAssignmentSuccess] load assignment success',
  props<{ assignments: AssignmentData }>()
);
export const loadAssignmentFailure = createAction(
  '[loadAssignmentFailure] load assignment failure',
  props<{ error: Err }>()
);
export const createAssignment = createAction(
  '[createAssignment] create assignment ',
  props<{ title: string; deadline: Date; description: string }>()
);
export const createAssignmentSuccess = createAction(
  '[createAssignmentSuccess] create assignment success ',
  props<{ assignment: SaveAssignmentData }>()
);
export const updateAssignment = createAction(
  '[updateAssignment] update assignment ',
  props<{ assignment: assign; id: string }>()
);
export const updateAssignmentSuccess = createAction(
  '[updateAssignmentSuccess] update assignment success ',
  props<{ assignment: UpdateAssignmentData }>()
);
export const inviteStudent = createAction(
  '[inviteStudent] toggle invite student',
  props<{ studentIds: number[]; assignmentId: string }>()
);
export const inviteStudentSuccess = createAction(
  '[inviteStudentSuccess] toggle invite student success',
  props<{ message: string; status: string }>()
);
export const inviteStudentFailure = createAction(
  '[inviteStudentFailure] toggle invite student failure',
  props<{ error: Err }>()
);
export const createAssignmentFailure = createAction(
  '[createAssignmentFailure] create assignment failure ',
  props<{ error: Err }>()
);
export const updateAssignmentFailure = createAction(
  '[updateAssignmentFailure] update assignment failure ',
  props<{ error: Err }>()
);
export const createAssignmentDraft = createAction(
  '[createAssignmentDraft] create assignment draft ',
  props<{ title: string; deadline: Date; description: string }>()
);
export const createAssignmentDraftSuccess = createAction(
  '[createAssignmentDraftSuccess] create assignment draft success ',
  props<{ assignment: createAssignmentData }>()
);
export const createAssignmentDraftFailure = createAction(
  '[createAssignmentDraftFailure] create assignment draft failure ',
  props<{ error: Err }>()
);

export const Delete = createAction('[delete] delete', props<{ id: number }>());
export const DeleteSuccess = createAction(
  '[deleteSuccess] delete success',
  props<{ message: string; status: string }>()
);
export const DeleteFailure = createAction(
  '[deleteFailure] delete failure',
  props<{ error: Err }>()
);

export const loadStudentAssignments = createAction(
  '[loadStudentAssignments] loadStudentAssignments'
);

export const loadStudentAssignmentsSuccess = createAction(
  'loadStudentAssignmentsSuccess',
  props<{
    assignment: AssignmentStudentData;
  }>()
);
export const loadStudentAssignmentsError = createAction(
  'loadStudentAssignmentsSuccess',
  props<{
    error: Err;
  }>()
);

export const deleteDraft = createAction('[deleteDraft] delete draft', props<{ id: number }>());
export const deleteDraftSuccess = createAction(
  '[deleteDraftSuccess] delete draft success',
  props<{ message: string; status: string }>()
);
export const deleteDraftFailure = createAction(
  '[deleteDraftFailure] delete draft failure',
  props<{ error: Err }>()
);
export const updateDraft = createAction(
  '[updateDraft] update draft',
  props<{ assignmentId: string }>()
);
export const updateDraftSuccess = createAction(
  '[updateDraftSuccess] update draft success',
  props<{ message: string; status: string }>()
);
export const updateDraftFailure = createAction(
  '[updateDraftFailure] update draft failure',
  props<{ error: Err }>()
);
export const loadSingleAssegnment = createAction(
  '[loadSingleAssegnment] loadSingleAssegnmentSuccess',
  props<{ assignmentId: string }>()
);
export const loadSingleAssegnmentSuccess = createAction(
  '[loadSingleAssegnmentSuccess] loadSingleAssegnmentSuccess success',
  props<{ assignment: assignmentAssignedData }>()
);
export const loadSingleAssegnmentFailure = createAction(
  '[loadSingleAssegnmentFailure] loadSingleAssegnmentFailure failure',
  props<{ error: Err }>()
);
export const loadAssignmentSubmissions = createAction(
  '[loadAssignmentSubmissions]  assingment submissions'
);
export const loadAssignmentSubmissionsSuccess = createAction(
  '[loadAssignmentSubmissionsSuccess] assignment submission success',
  props<{ assignment: LecturerSubmissionsData }>()
);
export const loadAssignmentSubmissionsFailure = createAction(
  '[loadAssignmentSubmissionsFailure] assignment submission failure',
  props<{ error: Err }>()
);
export const downloadProject = createAction(
  '[downloadProject]  download project',
  props<{ submissionId: number }>()
);
export const downloadProjectSuccess = createAction(
  '[downloadProjectSuccess] downloadProject success',
  props<{ assignment: Blob }>()
);
export const downloadProjectFailure = createAction(
  '[downloadProjectFailure] downloadProject failure',
  props<{ error: Err }>()
);
export const downloadSnapshot = createAction(
  '[downloadSnapshot]  download snapshot',
  props<{ submissionId: number; snapshotId: number }>()
);
export const downloadSnapshotSuccess = createAction(
  '[downloadSnapshotSuccess] download snapshot success',
  props<{ assignment: Blob }>()
);
export const downloadSnapshotFailure = createAction(
  '[downloadSnapshotFailure] download snapshot failure',
  props<{ error: Err }>()
);
export const loadSubmissionsWithExractedFiles = createAction(
  '[loadSubmissionsWithExractedFiles] load extracted files',
  props<{ studentId: number }>()
);
export const loadSubmissionsWithExractedFilesSuccess = createAction(
  '[loadSubmissionsWithExractedFilesSuccess] load exrtacted values success',
  props<{ submission: ApiResponse }>()
);
export const loadSubmissionsWithExractedFilesFailure = createAction(
  '[loadSubmissionsWithExractedFilesFailure]',
  props<{ error: Err }>()
);
export const loadUnAssignedStudents = createAction(
  '[loadUnAssignedStudents] load students',
  props<{ assignmentId: string }>()
);
export const loadUnAssignedStudentsSuccess = createAction(
  '[loadUnAssignedStudentsSuccess] load students success',
  props<{ student: unAssignData }>()
);
export const loadUnAssignedStudentsFailure = createAction(
  '[loadUnAssignedStudentsFailure] load students',
  props<{ error: string }>()
);

export interface DashboardData {
  status: string;
  data: {
    lecturers: number;
    students: number;
    assignments: number;
    submissions: number;
  };
}
export const loadDashboard = createAction('[loadDashboard] load dashboard');
export const loadDashboardSuccess = createAction(
  '[loadDashboardSuccess] load dashboard success',
  props<{ data: DashboardData }>()
);
export const loadDashboardFailure = createAction(
  '[loadDashboardFailure] load dashboard failure',
  props<{ error: Err }>()
);
