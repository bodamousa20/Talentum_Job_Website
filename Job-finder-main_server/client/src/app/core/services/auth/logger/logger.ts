import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandler } from '@core/services/error-handling';
import { environment } from '@environments';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class Logger {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<Observable<any>>(`${this.apiUrl}/auth/login`, body);
  }
}
