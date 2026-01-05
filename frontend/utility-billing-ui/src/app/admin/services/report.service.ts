import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {

  private baseUrl = 'http://localhost:9999/reports';

  constructor(private http: HttpClient) {}

  getMonthlyRevenue(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/monthly-revenue`);
  }

  getOutstandingDues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/outstanding-dues`);
  }

  getConsumptionByUtility(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/consumption-by-utility`);
  }
}
