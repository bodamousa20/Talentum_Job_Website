import { HttpClient } from '@angular/common/http';
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

  // GET Company by id
  getCompanyById(id: number): Observable<Company> {
    return this.http
      .get<Company>(`${this.apiUrl}/company/${id}`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  getCompanyJobs(id: number | string): Observable<Job[]> {
    return this.http
      .get<Job[]>(`${this.apiUrl}/company/jobs/${id}`)
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
        job
      )
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get all Applicants
  getAllApplicants(companyId: string | number): Observable<JobApplication[]> {
    return this.http
      .get<JobApplication[]>(
        `${this.apiUrl}/job-application/all-applications/company/${companyId}`
      )
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Applicants by Job
  getApplicantsByJob(jobId: string | number): Observable<JobApplication[]> {
    return this.http
      .get<JobApplication[]>(
        `${this.apiUrl}/job-application/all-applications/job/${jobId}`
      )
      .pipe(catchError(ErrorHandler.handleError));
  }
}
