/* eslint-disable @typescript-eslint/no-explicit-any */
export interface loginForm {
  email: string;
  password: string;
}
export interface Err {
  error: {
    error: string;
    message: string;
    status: string;
  };
}

export interface StudentData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  staff_id: string;
  password: string;
  role: string;
  invited: boolean;
}
export interface unAssignState {
  students: unAssignData;
  isLoading: boolean;
  error: string;
}
export interface studentState {
  students: Data;
  isLoading: boolean;
  error: string;
}
export interface LectureState {
  lecturer: DataLecturer;
  loading: boolean;
  error: Err;
}

export interface Data {
  status: string;
  data: { lecturers: StudentData[]; totalPages: number };
}
export interface unAssignData {
  status: string;
  data: StudentData[];
}
export interface DataLecturer {
  status: string;
  data: { lecturers: StudentData[]; totalPages: number };
}
export interface LecturerData {
  email: string;
  firstname: string;
  lastname: string;
}
export interface CreatedUser {
  emial: string;
  firstname: string;
  lastname: string;
  role: string;
  password: string;
  invited: boolean;
  staff_id: string;
  id: number;
}
export interface CreateState {
  Loading: boolean;
  error: string;
  User: CreatedUser;
  status: string;
}
export interface bulkState {
  loading: boolean;
  message: bulkData;
  error: Err;
}
export interface UploadUser {
  usersBulk: File;
  userRole: string;
}
export interface bulkData {
  status: string;
  message: string;
}
export interface assignment {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  assignmentId: string;
  isDraft: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    staff_id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
export interface assignmentState {
  isLoading: boolean;
  error: Err;
  assignment: AssignmentData;
  status: string;
  deleteLoading: boolean;
}
export interface AssignmentData {
  status: string;
  data: assignment[];
}
export interface createAssignment {
  title: string;
  deadline: Date;
  description: string;
}
export interface createAssignmentData {
  status: string;
  data: assignment[];
  message: string;
}
export interface SaveAssignmentData {
  status: string;
  assignment: assignment;
  message: string;
}
export interface UpdateAssignmentData {
  status: string;
  updatedAssignment: assignment;
  message: string;
}
export interface createAssignmentState {
  isLoading: boolean;
  error: Err;
  assignment: createAssignmentData;
}
export interface SaveAssignmentState {
  isLoading: boolean;
  error: Err;
  assignment: SaveAssignmentData;
}
export interface InviteState {
  isLoading: boolean;
  error: Err;
  message: string;
  status: string;
}
export interface assign {
  title: string;
  description: string;
  deadline: Date;
}

export interface AssignmentStudent {
  id: number;
  userId: number;
  assignmentId: string;
  submitted: boolean;
  assignment: {
    id: number;
    title: string;
    deadline: Date;
    description: string;
  };
}
export interface AssignmentStudentState {
  isLoading: boolean;
  data: AssignmentStudentData;
  status: string;
  error: Err;
}

export interface AssignmentStudentData {
  status: string;
  data: AssignmentStudent[];
}

export interface assignmentAssignedData {
  status: string;
  data: {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    assignmentId: string;
    isDraft: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    AssignmentToUser: assignmentAssign[];
  };
}
interface assignmentAssign {
  id: number;
  userId: number;
  assignmentId: number;
  user: StudentData;
}
interface submissionData {
  id: number;
  assignmentId: string;
  studentId: number;
  submissionCode: string;
  createdAt: Date;
  updatedAt: Date;
  student: StudentData;
  snapshots: SnapshotsData[];
}
export interface assignmentAssignedState {
  isLoading: boolean;
  data: assignmentAssignedData;
  error: Err;
}
export interface assignmentAssigned {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  assignmentId: string;
  isDraft: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface InviteStudentData {
  assignmentId: string;
  studentIds: number[];
}
export interface reset {
  message: string;
}
export interface password {
  newPassword: string;
}
export interface message {
  message: string;
}
export interface UserData {
  role: string;
  token: string;
  firstName: string;
}
export interface LecturerSubmissionsData {
  status: string;
  data: [
    {
      id: number;
      title: string;
      description: string;
      deadline: Date;
      assignmentId: string;
      isDraft: boolean;
      authorId: number;
      createdAt: Date;
      updatedAt: Date;
      submissions: submissionData[];
    }
  ];
}

export interface submission {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  assignmentId: string;
  isDraft: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  submissions: submissionData[];
}

// interface snapshot {
//   id: number;
//   name: string;
//   filepath: string;
//   submissionId: number;
//   createdAt: Date;
//   updatedAt: Date;
// }
export interface AssignmentSubmissionState {
  isLoading: boolean;
  error: Err;
  data: LecturerSubmissionsData;
}
interface Assignment {
  id: number;
  title: string;
  description: string;
  deadline: string;
  assignmentId: string;
  isDraft: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  staff_id: string;
  password: string;
  role: string;
  invited: boolean;
}

export interface ExtractedFiles {
  [key: string]: string;
}

export interface FileContents {
  [fileName: string]: {
    path: string;
    content: string;
  };
}
export interface FileContent {
  fileName: string;
  content: string;
}

export interface DirectoryTree {
  [folderName: string]: DirectoryItem;
}
export interface DirectoryItem {
  [itemName: string]: DirectoryItem | FileItem;
}

export interface FileItem {
  path: string;
  content: FileContent;
}
export interface FileStructure {
  root: DirectoryTree;
}
interface Submission {
  id: number;
  assignmentId: string;
  studentId: number;
  submissionCode: string;
  createdAt: string;
  updatedAt: string;
  assignment: Assignment;
  student: Student;
  snapshots: SnapshotsData[];
}

export interface ApiResponse {
  status: string;
  data: Submission[];
}

export interface SubmissionExtracedState {
  data: ApiResponse;
  loading: boolean;
  error: Err;
}
export interface File {
  path: string;
  content: string;
  type: string;
}

export interface Folder {
  path: string;
  type: string;
  content: Folder[] | string;
}

interface snapshots {
  snapshots: Folder[];
}

export interface SnapshotsData {
  id: number;
  name: string;
  filepath: string;
  submissionId: number;
  createdAt: string;
  updatedAt: string;
  extractedFiles: snapshots[];
}
