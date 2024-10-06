import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@core/models/category';
import { Job } from '@core/models/tempCodeRunnerFile';
import { environment } from '@environments';
import { catchError, Observable } from 'rxjs';
import { ErrorHandler } from '../error-handling';

@Injectable()
export class CategoryService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Get all Categories
  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiUrl}/all-categories`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Jobs Per Category
  getJobsByCategory(categoryId: number): Observable<Job[]> {
    return this.http
      .get<Job[]>(`${this.apiUrl}/category/category-jobs/${categoryId}`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Get Number of jobs per category
  getNumberOfJobsPerCategory(categoryId: number): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/category/jobs-count/${categoryId}`)
      .pipe(catchError(ErrorHandler.handleError));
  }
}
