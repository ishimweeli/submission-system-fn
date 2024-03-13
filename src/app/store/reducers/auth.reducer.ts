import { createReducer, on } from '@ngrx/store';
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
  createLecture,
  createLectureFailure,
  createLectureSuccess,
  createStudent,
  createStudentFailure,
  createStudentSuccess,
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
  logout,
  logoutFailure,
  logoutSuccess,
  resetAction,
  resetPasswordFailure,
  resetPasswordSuccess,
  updateAssignment,
  updateAssignmentFailure,
  updateAssignmentSuccess,
  updateDraft,
  updateDraftFailure,
  updateDraftSuccess,
  DashboardData,
  loadDashboard,
  loadDashboardSuccess,
  loadDashboardFailure
} from '../actions/auth.actions';
import {
  AssignmentStudentState,
  AssignmentSubmissionState,
  CreateState,
  Err,
  SaveAssignmentState,
  SubmissionExtracedState,
  assignment,
  assignmentAssignedState,
  assignmentState,
  bulkState,
  createAssignmentState,
  unAssignState
} from 'src/app/types';
import { LectureState, studentState } from 'src/app/types';

export interface loginState {
  user: {
    token: string;
    role: string;
    firstName: string;
  };
  error: Err;
  isLoading: boolean;
}
const initilaState: loginState = {
  user: {
    token: '',
    role: '',
    firstName: ''
  },
  error: {
    error: {
      error: '',
      status: '',
      message: ''
    }
  },
  isLoading: false
};
const studentInitilaState: studentState = {
  students: {
    status: '',
    data: {
      lecturers: [],
      totalPages: 0
    }
  },
  isLoading: false,
  error: ''
};
const unAssignedstudentInitilaState: unAssignState = {
  students: {
    status: '',
    data: []
  },
  isLoading: false,
  error: ''
};
const lectureInitalState: LectureState = {
  lecturer: {
    status: '',
    data: {
      lecturers: [],
      totalPages: 0
    }
  },
  loading: false,
  error: {
    error: {
      message: '',
      status: '',
      error: ''
    }
  }
};
const createUserInitialstate: CreateState = {
  Loading: false,
  status: '',
  error: '',
  User: {
    emial: '',
    lastname: '',
    firstname: '',
    role: '',
    id: 0,
    staff_id: '',
    invited: false,
    password: ''
  }
};

const bulkInitialstate: bulkState = {
  loading: false,
  message: {
    status: '',
    message: ''
  },
  error: {
    error: {
      error: '',
      status: '',
      message: ''
    }
  }
};
const assignmentInitialState: assignmentState = {
  isLoading: false,
  deleteLoading: false,
  status: '',
  error: {
    error: {
      error: '',
      status: '',
      message: ''
    }
  },
  assignment: {
    status: '',
    data: []
  }
};
const resetInitialState: { message: string; error: string; isLoading: boolean } = {
  message: '',
  error: '',
  isLoading: false
};

const createAssignmentInitialState: SaveAssignmentState = {
  isLoading: false,
  assignment: {
    status: '',
    message: '',
    assignment: {
      assignmentId: '',
      id: 0,
      title: '',
      description: '',
      deadline: new Date(),
      isDraft: false,
      authorId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: 0,
        staff_id: '',
        email: '',
        firstName: '',
        lastName: ''
      }
    }
  },
  error: {
    error: {
      error: '',
      message: '',
      status: ''
    }
  }
};
const createAssignmentDraftInitialState: createAssignmentState = {
  isLoading: false,
  assignment: {
    status: '',
    message: '',
    data: []
  },
  error: {
    error: {
      error: '',
      message: '',
      status: ''
    }
  }
};

const studentAssignment: AssignmentStudentState = {
  status: '',
  data: {
    status: '',
    data: []
  },
  isLoading: false,
  error: {
    error: {
      error: '',
      message: '',
      status: ''
    }
  }
};
const AssigmnetSubmissionInitialState: AssignmentSubmissionState = {
  isLoading: false,
  error: {
    error: {
      error: '',
      message: '',
      status: ''
    }
  },
  data: {
    data: [
      {
        id: 0,
        title: '',
        description: '',
        deadline: new Date(),
        assignmentId: '',
        isDraft: false,
        authorId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        submissions: []
      }
    ],
    status: ''
  }
};
const singleAssinmentState: assignmentAssignedState = {
  data: {
    status: '',
    data: {
      id: 0,
      title: '',
      description: '',
      deadline: new Date(),
      assignmentId: '',
      isDraft: false,
      authorId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      AssignmentToUser: []
    }
  },
  isLoading: false,
  error: {
    error: {
      error: '',
      message: '',
      status: ''
    }
  }
};
export interface download {
  data: Blob | null;
  snapshotLoading: boolean;
}
export interface downloadSubmission {
  data: Blob | null;
  loading: boolean;
}
const downloadInitialState: download = {
  data: null,
  snapshotLoading: false
};
const downloadSubmission: downloadSubmission = {
  data: null,
  loading: false
};
export const LoginReducer = createReducer(
  initilaState,
  on(login, (state) => ({
    ...state,
    isLoading: true,
    error: {
      error: {
        error: '',
        message: '',
        status: ''
      }
    }
  })),
  on(loginSuccess, (state, { userData }) => ({
    ...state,
    user: userData,
    isLoading: false,
    error: {
      error: {
        error: '',
        message: '',
        status: ''
      }
    }
  })),
  on(loginFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  on(logout, () => initilaState),
  on(logoutSuccess, (state, { message }) => ({
    ...state,
    isLoading: false,
    message
  })),
  on(logoutFailure, (state) => ({
    ...state,
    isLoading: false
  }))
);

export const studentReducer = createReducer(
  studentInitilaState,
  on(loadStudents, (state) => ({ ...state, isLoading: true })),
  on(loadStudentsSuccess, (state, { student }) => ({
    ...state,
    isLoading: false,
    students: {
      status: student.status,
      data: { lecturers: student.data.lecturers, totalPages: student.data.totalPages }
    }
  })),

  on(loadStudentsFailure, (state, { error }) => ({ ...state, isLoading: false, error: error }))
);

export const lectureReducer = createReducer(
  lectureInitalState,
  on(loadlecture, (state) => ({ ...state, loading: true })),
  on(loadlectureSucces, (state, { lecture }) => ({
    ...state,
    loading: false,
    lecturer: {
      status: lecture.status,
      data: {
        lecturers: lecture.data.lecturers,
        totalPages: lecture.data.totalPages
      }
    }
  })),
  on(loadlectureFailure, (state, { error }) => ({ ...state, loading: false, error: error }))
);

export const createLectureReducer = createReducer(
  createUserInitialstate,
  on(createLecture, (state) => ({ ...state, Loading: true, error: '', status: '' })),
  on(createLectureSuccess, (state, { user }) => ({
    ...state,
    Loading: false,
    User: user,
    status: 'success'
  })),
  on(createLectureFailure, (state, action) => ({
    ...state,
    Loading: false,
    error: action.error.error.message,
    status: 'failed'
  }))
);

export const createStudentReducer = createReducer(
  createUserInitialstate,
  on(createStudent, (state) => ({
    ...state,
    Loading: true,
    status: '',
    error: ''
  })),
  on(createStudentSuccess, (state, { user }) => ({
    ...state,
    Loading: false,
    student: user,
    status: 'success'
  })),
  on(createStudentFailure, (state, { error }) => ({
    ...state,
    Loading: false,
    error: error.error.message,
    status: 'failed'
  }))
);

export const bulkReducer = createReducer(
  bulkInitialstate,
  on(bulkStudent, (state) => ({
    ...state,
    loading: true,
    error: {
      error: {
        error: '',
        status: '',
        message: ''
      }
    },
    message: {
      status: '',
      message: ''
    }
  })),
  on(bulkStudentSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message: {
      status: message.status,
      message: message.message
    }
  })),
  on(bulkStudentFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(bulkLecture, (state) => ({
    ...state,
    loading: true,
    error: {
      error: {
        error: '',
        status: '',
        message: ''
      }
    },
    message: {
      status: '',
      message: ''
    }
  })),
  on(bulkLectureSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message: {
      status: message.status,
      message: message.message
    }
  })),
  on(bulkLectureFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }))
);

export const resetPasswordReducer = createReducer(
  resetInitialState,
  on(resetAction, (state) => ({
    ...state,
    isLoading: true
  })),
  on(resetPasswordSuccess, (state, { message }) => ({
    ...state,
    message: message,
    isLoading: false,
    error: ''
  })),
  on(resetPasswordFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  }))
);

export const AssignmentReducer = createReducer(
  assignmentInitialState,
  on(loadAssignment, (state) => ({
    ...state,
    isLoading: true
  })),
  on(loadAssignmentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    assignment: action.assignments
  })),
  on(loadAssignmentFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  on(Delete, (state, { id }) => {
    const filteredAssignments = state.assignment.data.filter((assignment) => assignment.id !== id);
    return {
      ...state,
      assignment: {
        ...state.assignment,
        data: filteredAssignments
      },
      deleteLoading: true,
      status: ''
    };
  }),
  on(DeleteSuccess, (state, action) => ({
    ...state,
    deleteLoading: false,
    status: action.status
  })),
  on(DeleteFailure, (state) => ({
    ...state,
    deleteLoading: false
  })),
  on(deleteDraft, (state, { id }) => {
    const filteredAssignments = state.assignment.data.filter((assignment) => assignment.id !== id);
    return {
      ...state,
      assignment: {
        ...state.assignment,
        data: filteredAssignments
      },
      deleteLoading: true,
      status: ''
    };
  }),
  on(deleteDraftSuccess, (state, action) => ({
    ...state,
    deleteLoading: false,
    status: action.status
  })),
  on(deleteDraftFailure, (state) => ({
    ...state,
    deleteLoading: false
  })),
  on(updateAssignment, (state) => ({
    ...state,
    deleteLoading: true,
    status: ''
  })),
  on(updateAssignmentSuccess, (state, action) => ({
    ...state,
    deleteLoading: false,
    status: action.assignment.status,
    assignment: {
      ...state.assignment,
      data: state.assignment.data.map((item) =>
        item.assignmentId === action.assignment.updatedAssignment.assignmentId
          ? { ...item, ...action.assignment.updatedAssignment }
          : item
      )
    }
  })),
  on(updateAssignmentFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  on(updateDraft, (state, { assignmentId }) => {
    const assignmentIndex = state.assignment.data.findIndex(
      (assignment) => assignment.assignmentId === assignmentId
    );
    let isDraftAssignment: assignment[] = [];
    if (assignmentIndex !== -1) {
      const assignmentDraft = { ...state.assignment.data[assignmentIndex] };
      assignmentDraft.isDraft = !assignmentDraft.assignmentId;
      isDraftAssignment = [...state.assignment.data];
      isDraftAssignment[assignmentIndex] = assignmentDraft;
    }
    return {
      ...state,
      assignment: {
        ...state.assignment,
        data: isDraftAssignment
      },
      deleteLoading: true,
      status: ''
    };
  }),
  on(updateDraftSuccess, (state, action) => ({
    ...state,
    deleteLoading: false,
    status: action.status
  })),
  on(updateDraftFailure, (state, action) => ({
    ...state,
    deleteLoading: false,
    error: action.error
  }))
);

export const createAssignmentReducer = createReducer(
  createAssignmentInitialState,
  on(createAssignment, (state) => ({
    ...state,
    isLoading: true,
    assignment: {
      status: '',
      assignment: {
        id: 0,
        title: '',
        description: '',
        deadline: new Date(),
        assignmentId: '',
        isDraft: false,
        authorId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          id: 0,
          staff_id: '',
          email: '',
          firstName: '',
          lastName: ''
        }
      },
      message: ''
    },
    error: {
      error: {
        error: '',
        status: '',
        message: ''
      }
    }
  })),
  on(createAssignmentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    assignment: action.assignment
  })),
  on(createAssignmentFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);
const inviteInitialState = {
  isLoading: false,
  error: {
    error: {
      error: '',
      status: '',
      message: ''
    }
  }
};
export const InviteReducer = createReducer(
  inviteInitialState,
  on(inviteStudent, (state) => ({
    ...state,
    isLoading: true,
    status: '',
    error: {
      error: {
        error: '',
        status: '',
        message: ''
      }
    }
  })),
  on(inviteStudentSuccess, (state, action) => ({
    ...state,
    message: action.message,
    status: action.status,
    isLoading: false,
    error: {
      error: {
        error: '',
        status: '',
        message: ''
      }
    }
  })),
  on(inviteStudentFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);
export const createAssignmentDraftReducer = createReducer(
  createAssignmentDraftInitialState,
  on(createAssignmentDraft, (state) => ({
    ...state,
    isLoading: true,
    assignment: {
      status: '',
      data: [],
      message: ''
    },
    error: {
      error: {
        status: '',
        message: '',
        error: ''
      }
    }
  })),
  on(createAssignmentDraftSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    assignment: action.assignment,
    error: {
      error: {
        status: '',
        message: '',
        error: ''
      }
    }
  })),
  on(createAssignmentDraftFailure, (state, action) => ({
    ...state,
    assignment: {
      status: '',
      data: [],
      message: ''
    },
    isLoading: false,
    error: action.error
  }))
);

export const StudentAssignment = createReducer(
  studentAssignment,
  on(loadStudentAssignments, (state) => ({
    ...state,
    isLoading: true,
    error: {
      error: {
        status: '',
        message: '',
        error: ''
      }
    }
  })),
  on(loadStudentAssignmentsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    data: {
      status: action.assignment.status,
      data: action.assignment.data
    }
  })),
  on(loadStudentAssignmentsError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);

export const singleAssignmentReducer = createReducer(
  singleAssinmentState,
  on(loadSingleAssegnment, (state) => ({
    ...state,
    isLoading: true,
    error: {
      error: {
        error: '',
        message: '',
        status: ''
      }
    },
    data: {
      data: {
        id: 0,
        title: '',
        description: '',
        deadline: new Date(),
        assignmentId: '',
        isDraft: false,
        authorId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        AssignmentToUser: []
      },
      status: ''
    }
  })),
  on(loadSingleAssegnmentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    data: {
      data: action.assignment.data,
      status: action.assignment.status
    }
  })),
  on(loadSingleAssegnmentFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);
export const UnAssignedstudentReducer = createReducer(
  unAssignedstudentInitilaState,
  on(loadUnAssignedStudents, (state) => ({ ...state, isLoading: true })),
  on(loadUnAssignedStudentsSuccess, (state, { student }) => ({
    ...state,
    isLoading: false,
    students: {
      status: student.status,
      data: student.data
    }
  })),

  on(loadUnAssignedStudentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  }))
);
export const assignmentSubmissionReducer = createReducer(
  AssigmnetSubmissionInitialState,
  on(loadAssignmentSubmissions, (state) => ({
    ...state,
    isLoading: true,
    error: {
      error: {
        error: '',
        message: '',
        status: ''
      }
    }
  })),
  on(loadAssignmentSubmissionsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    data: {
      data: action.assignment.data,
      status: action.assignment.status
    }
  })),
  on(loadAssignmentSubmissionsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);
export const downloadReducer = createReducer(
  downloadInitialState,
  on(downloadSnapshot, (state) => ({ ...state, snapshotLoading: true, data: null })),
  on(downloadSnapshotSuccess, (state, action) => ({
    ...state,
    snapshotLoading: false,
    data: action.assignment
  })),
  on(downloadSnapshotFailure, (state, action) => ({
    ...state,
    snapshotLoading: false,
    error: action.error
  }))
);
const extractedInitialState: SubmissionExtracedState = {
  data: {
    status: '',
    data: []
  },
  loading: false,
  error: {
    error: {
      error: '',
      message: '',
      status: ''
    }
  }
};
export const submissionExtractedFilesReducer = createReducer(
  extractedInitialState,
  on(loadSubmissionsWithExractedFiles, (state) => ({
    ...state,
    loading: true,
    error: {
      error: {
        error: '',
        message: '',
        status: ''
      }
    }
  })),
  on(loadSubmissionsWithExractedFilesSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: {
      status: action.submission.status,
      data: action.submission.data
    }
  })),
  on(loadSubmissionsWithExractedFilesFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  }))
);
export interface dataState {
  loading: boolean;
  data: DashboardData;
  error: Err;
}
const dataInitialState: dataState = {
  loading: false,
  data: {
    status: '',
    data: {
      lecturers: 0,
      students: 0,
      assignments: 0,
      submissions: 0
    }
  },
  error: {
    error: {
      error: '',
      status: '',
      message: ''
    }
  }
};
export const DashboardDataReducer = createReducer(
  dataInitialState,
  on(loadDashboard, (state) => ({ ...state, loading: true })),
  on(loadDashboardSuccess, (state, action) => ({ ...state, loading: false, data: action.data })),
  on(loadDashboardFailure, (state, action) => ({ ...state, loading: false, error: action.error }))
);
export const downloadSubmissionReducer = createReducer(
  downloadSubmission,
  on(downloadProject, (state) => ({ ...state, loading: true, data: null })),
  on(downloadProjectSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: action.assignment
  })),
  on(downloadProjectFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  }))
);
