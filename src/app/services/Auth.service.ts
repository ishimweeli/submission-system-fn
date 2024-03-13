import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Data,
  CreatedUser,
  LecturerData,
  loginForm,
  bulkData,
  AssignmentData,
  createAssignment,
  createAssignmentData,
  SaveAssignmentData,
  UpdateAssignmentData,
  AssignmentStudentData,
  assignmentAssignedData,
  InviteStudentData,
  password,
  reset,
  UserData,
  message,
  LecturerSubmissionsData,
  ApiResponse,
  unAssignData
} from '../types';
import { environment } from '../../environments/environment.development';
import { DashboardData } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  login(data: loginForm): Observable<UserData> {
    return this.apiService.post<UserData>(`${environment.BACKEND_URL}/users/admin/login`, data);
  }

  logout(): Observable<message> {
    const response = this.apiService.get<message>(`${environment.BACKEND_URL}/users/logout`);
    return response;
  }

  getStudents(page: number): Observable<Data> {
    const response = this.apiService.get<Data>(
      `${environment.BACKEND_URL}/users/admin/all/student`,
      {
        page
      }
    );
    return response;
  }
  getLectures(page: number): Observable<Data> {
    const response = this.apiService.get<Data>(
      `${environment.BACKEND_URL}/users/admin/all/lecture`,
      {
        page
      }
    );
    return response;
  }
  createLecture(data: LecturerData): Observable<CreatedUser> {
    return this.apiService.post<CreatedUser>(
      `${environment.BACKEND_URL}/users/admin/create/lecture`,
      data
    );
  }
  createStudent(data: LecturerData): Observable<CreatedUser> {
    return this.apiService.post<CreatedUser>(
      `${environment.BACKEND_URL}/users/admin/create/student`,
      data
    );
  }

  bulkStudent(data: File, userRole: string): Observable<bulkData> {
    const formData = new FormData();
    formData.append('usersBulk', data);
    formData.append('userRole', userRole);
    return this.apiService.post<bulkData>(
      `${environment.BACKEND_URL}/users/admin/create/students/bulk`,
      formData
    );
  }
  bulkLecture(data: File, userRole: string): Observable<bulkData> {
    const formData = new FormData();
    formData.append('usersBulk', data);
    formData.append('userRole', userRole);
    return this.apiService.post<bulkData>(
      `${environment.BACKEND_URL}/users/admin/create/lectures/bulk`,
      formData
    );
  }
  resetPassword(data: password): Observable<reset> {
    return this.apiService.post<reset>(`${environment.BACKEND_URL}/users/reset/password`, data);
  }

  getAssignment(sortBy: string | undefined): Observable<AssignmentData> {
    return this.apiService.get(`${environment.BACKEND_URL}/assignments/lecturer/assignments`, {
      sortBy
    });
  }
  createAssignment(data: createAssignment): Observable<SaveAssignmentData> {
    return this.apiService.post<SaveAssignmentData>(
      `${environment.BACKEND_URL}/assignments/lecturer/assignment/publish`,
      data
    );
  }
  createAssignmentDraft(data: createAssignment): Observable<createAssignmentData> {
    return this.apiService.post<createAssignmentData>(
      `${environment.BACKEND_URL}/assignments/lecturer/assignment/draft`,
      data
    );
  }

  publishAssignment(data: InviteStudentData): Observable<{ message: string; status: string }> {
    return this.apiService.post<{ message: string; status: string }>(
      `${environment.BACKEND_URL}/assignments/lecturer/assign/published`,
      data
    );
  }
  deleteAssignment(data: number): Observable<{ message: string; status: string }> {
    return this.apiService.delete<{ message: string; status: string }>(
      `${environment.BACKEND_URL}/assignments/lecturer/delete/published/${data}`
    );
  }

  updateAssignment(data: createAssignment, id: string): Observable<UpdateAssignmentData> {
    return this.apiService.patch<UpdateAssignmentData>(
      `${environment.BACKEND_URL}/assignments/lecturer/update/${id}`,
      data
    );
  }
  studentAssignments(): Observable<AssignmentStudentData> {
    return this.apiService.get<AssignmentStudentData>(
      `${environment.BACKEND_URL}/assignments/student/all/assignments/:userId`
    );
  }

  deleteDraft(data: number): Observable<{ message: string; status: string }> {
    return this.apiService.delete<{ message: string; status: string }>(
      `${environment.BACKEND_URL}/assignments/lecturer/delete/draft/${data}`
    );
  }
  updateIsDraft(data: string): Observable<{ message: string; status: string }> {
    return this.apiService.patch<{ message: string; status: string }>(
      `${environment.BACKEND_URL}/assignments/lecturer/update/isDraft/${data}`
    );
  }
  singleAssegnment(assignmentId: string): Observable<assignmentAssignedData> {
    return this.apiService.get<assignmentAssignedData>(
      `${environment.BACKEND_URL}/assignments/assignment/student/:assignmentId`,
      {
        assignmentId
      }
    );
  }
  unAssingnedstudentAssignments(assignmentId: string): Observable<unAssignData> {
    return this.apiService.get<unAssignData>(
      `${environment.BACKEND_URL}/assignments/lecturer/unAssigned/students/:assignmentId`,
      { assignmentId }
    );
  }
  lecturerSubmissions(): Observable<LecturerSubmissionsData> {
    return this.apiService.get<LecturerSubmissionsData>(
      `${environment.BACKEND_URL}/assignments/lecturer/submissions`
    );
  }

  downloadFile(submissionId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    return this.http.get(
      `${environment.BACKEND_URL}/submissions/lecturer/download/student/all/submissions`,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          submissionId: submissionId
        }
      }
    );
  }
  downloadSnapshot(submissionId: number, snapshotId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    return this.http.get(`${environment.BACKEND_URL}/submissions/lecturer/download/submissions`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        submissionId: submissionId,
        snapshotId: snapshotId
      }
    });
  }

  submissionWithExtractedFiles(studentId: number): Observable<ApiResponse> {
    return this.apiService.get(`${environment.BACKEND_URL}/submissions/snapshots/:studentId`, {
      studentId
    });
  }
  dashboardData(): Observable<DashboardData> {
    return this.apiService.get(`${environment.BACKEND_URL}/users/admin/dashboard`);
  }
}
