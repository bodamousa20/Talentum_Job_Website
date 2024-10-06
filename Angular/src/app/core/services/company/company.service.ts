import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@core/models/company';
import { Job } from '@core/models/job';
import { JobApplication } from '@core/models/job-application';
import { environment } from '@environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { ErrorHandler } from '../error-handling';

@Injectable()
export class CompanyService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Set the token in the Authorization header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Access the token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Use the retrieved token
    });
  }

  // GET Company by id
  getCompanyById(id: number): Observable<Company> {
    return this.http
      .get<Company>(`${this.apiUrl}/company/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Company Jobs
  getCompanyJobs(id: number | string): Observable<Job[]> {
    return this.http
      .get<Job[]>(`${this.apiUrl}/company/jobs/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Add Job
  addJob(
    categoryId: string | number,
    companyId: string | number,
    job: Job
  ): Observable<Job> {
    return this.http
      .post<Job>(
        `${this.apiUrl}/company/${companyId}/add-job/category/${categoryId}`,
        job,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get all Applicants
  getAllApplicants(companyId: string | number): Observable<JobApplication[]> {
    return this.http
      .get<JobApplication[]>(
        `${this.apiUrl}/job-application/all-applications/company/${companyId}`,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Applicants by Job
  getApplicantsByJob(jobId: string | number): Observable<JobApplication[]> {
    return this.http
      .get<JobApplication[]>(
        `${this.apiUrl}/job-application/all-applications/job/${jobId}`,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(ErrorHandler.handleError));
  }
}
