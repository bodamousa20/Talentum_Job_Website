import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { environment } from '@environments';
import { catchError, Observable } from 'rxjs';
import { ErrorHandler } from '../error-handling';

@Injectable()
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Get User Profile
  getUserProfile(userId: number | string): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/user/profile/${userId}`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Saved Jobs
  getSavedJobs(userId: number | string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/user/saved-jobs/${userId}`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Save Job
  //
  saveJob(userId: string | number, jobId: string | number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/user/save-job/${userId}/${jobId}`, {})
      .pipe(catchError(ErrorHandler.handleError));
  }

  // UnSave Job
  unSaveJob(jobId: string | number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/user/saved-jobs/${jobId}`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Check if job is saved
  isInSavedJobs(
    userId: string | number,
    jobId: string | number
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/user/is-job-saved/${userId}/${jobId}`
    );
  }

  // Get Applied Jobs
  getAppliedJobs(userId: number | string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/job-application/all-applications/user/${userId}`)
      .pipe(catchError(ErrorHandler.handleError));
  }
}
