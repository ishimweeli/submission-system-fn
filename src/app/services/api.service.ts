import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  loginForm,
  LecturerData,
  UploadUser,
  createAssignment,
  InviteStudentData,
  password
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string | null;
  post<T>(
    url: string,
    data:
      | loginForm
      | LecturerData
      | UploadUser
      | FormData
      | File
      | password
      | createAssignment
      | InviteStudentData
  ): Observable<T> {
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<T>(url, data, { headers: headers });
  }
  get<T>(
    url: string,
    param?: { [param: string]: string | string[] | number | undefined }
  ): Observable<T> {
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    let httpParams = new HttpParams();
    if (param) {
      Object.keys(param).forEach((key) => {
        httpParams = httpParams.append(key, param[key] as string);
      });
    }
    return this.http.get<T>(url, { headers, params: httpParams });
  }
  delete<T>(url: string): Observable<T> {
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.delete<T>(url, { headers: headers });
  }
  patch<T>(url: string, data?: createAssignment): Observable<T> {
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.patch<T>(url, data, { headers: headers });
  }
  setToken(): void {
    this.token = localStorage.getItem('token');
  }
  constructor(private http: HttpClient) {}
}
