import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MeterReadingResponse } from '../models/meter-reading.model';
import { GenerateBillRequest } from '../models/generate-bill.model';
import { BillResponse } from '../models/bill-response.model';

@Injectable({ providedIn: 'root' })
export class BillingService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* -------- METER READINGS -------- */

  createReading(payload: any): Observable<MeterReadingResponse> {
    return this.http.post<MeterReadingResponse>(
      `${this.baseUrl}/meter-readings`,
      payload
    );
  }

  getLatestReading(connectionId: string): Observable<MeterReadingResponse> {
    return this.http.get<MeterReadingResponse>(
      `${this.baseUrl}/meter-readings/latest/${connectionId}`
    );
  }

  getPreviousReading(connectionId: string): Observable<MeterReadingResponse> {
    return this.http.get<MeterReadingResponse>(
      `${this.baseUrl}/meter-readings/previous/${connectionId}`
    );
  }

  /* -------- BILLS -------- */

  generateBill(payload: GenerateBillRequest): Observable<BillResponse> {
    return this.http.post<BillResponse>(
      `${this.baseUrl}/bills/generate`,
      payload
    );
  }

  getBills(): Observable<BillResponse[]> {
    return this.http.get<BillResponse[]>(
      `${this.baseUrl}/bills`
    );
  }
}
