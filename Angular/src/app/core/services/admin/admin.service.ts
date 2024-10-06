import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@core/models/company';
import { environment } from '@environments';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Set the token in the Authorization header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Access the token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Use the retrieved token
    });
  }

  // Get all companies
  getAllCompanies(): Observable<Company[]> {
    return this.http
      .get<Company[]>(`${this.apiUrl}/admin/all-companies`, { headers: this.getHeaders() }); // Include headers
  }

  // Get company by ID
  getCompanyById(companyId: number | string): Observable<Company> {
    return this.http
      .get<Company>(`${this.apiUrl}/admin/company/${companyId}`, { headers: this.getHeaders() }); // Include headers
  }

  // Get company logo
  getCompanyLogo(companyId: number | string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/admin/company-logo/${companyId}`, {
      headers: this.getHeaders(), // Include headers
      responseType: 'blob',
    });
  }
}
