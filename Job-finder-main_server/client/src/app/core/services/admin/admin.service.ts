import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@core/models/company';
import { environment } from '@environments';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // get all companies
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/admin/all-companies`);
  }

  // get company
  getCompanyById(companyId: number | string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/admin/company/${companyId}`);
  }

  // get company logo
  getCompanyLogo(companyId: number | string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/admin/company-logo/${companyId}`, {
      responseType: 'blob',
    });
  }
}
