import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@core/models/job';
import { JobApplication } from '@core/models/job-application';
import { environment } from '@environments';
import { catchError, Observable } from 'rxjs';
import { ErrorHandler } from '../error-handling';

@Injectable()
export class JobService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Set the token in the Authorization header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Access the token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Use the retrieved token
    });
  }

  // Get All Jobs
  getAllJobs(): Observable<Job[]> {
    return this.http
      .get<Job[]>(`${this.apiUrl}/jobs/search`, { headers: this.getHeaders() }) // Include headers
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Filtered Jobs
  filterJobs(
    categoryIds?: number[],
    title?: string,
    types?: string[],
    city?: string,
    experience?: string
  ): Observable<Job[]> {
    categoryIds = categoryIds ?? [];
    title = title ?? '';
    types = types ?? [];
    city = city ?? '';
    experience = experience ?? '';
    
    return this.http
      .get<Job[]>(`${this.apiUrl}/jobs/filter`, {
        headers: this.getHeaders(), // Include headers
        params: {
          categoryIds: categoryIds,
          title: title,
          types: types,
          city: city,
          experience: experience,
        },
      })
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Paginated Jobs
  getPaginatedJobs(): Observable<{ jobs: Job[]; totalRecords: number }> {
    return this.http
      .get<{ jobs: Job[]; totalRecords: number }>(
        `${this.apiUrl}/jobs/paginated`,
        { headers: this.getHeaders() } // Include headers
      )
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get job by id
  getJobById(id: string | number): Observable<Job> {
    return this.http
      .get<Job>(`${this.apiUrl}/jobs/${id}`, { headers: this.getHeaders() }) // Include headers
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Job Applications
  // Apply to Job
  applyToJob(
    jobApplication: JobApplication,
    jobId: number | string,
    userId: number | string
  ): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/job-application/apply/${userId}/${jobId}`,
        jobApplication,
        { headers: this.getHeaders() } // Include headers
      )
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get all Applicants
  getAllApplicants(): Observable<JobApplication[]> {
    return this.http
      .get<JobApplication[]>(`${this.apiUrl}/job-application/all-applications`, { headers: this.getHeaders() }) // Include headers
      .pipe(catchError(ErrorHandler.handleError));
  }

  // is In the Applied List
  isInAppliedList(
    jobId: number | string,
    userId: number | string
  ): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/job-application/is-applied/${userId}/${jobId}`, { headers: this.getHeaders() }) // Include headers
      .pipe(catchError(ErrorHandler.handleError));
  }
}
