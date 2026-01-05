import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MeterReadingRequest } from '../models/meter-reading-request.model';
import { MeterReadingResponse } from '../models/meter-reading-response.model';

@Injectable({ providedIn: 'root' })
export class MeterReadingService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  createReading(data: MeterReadingRequest): Observable<MeterReadingResponse> {

    const payload = {
      connectionId: data.connectionId,
      consumerId: data.consumerId,
      utilityId: data.utilityId,
      readingValue: data.readingValue,

  
      readingDate: new Date(data.readingDate).toISOString().split('T')[0]
    };

    return this.http.post<MeterReadingResponse>(
      `${this.baseUrl}/meter-readings`,
      payload
    );
  }

  getByConnection(connectionId: string): Observable<MeterReadingResponse[]> {
    return this.http.get<MeterReadingResponse[]>(
      `${this.baseUrl}/meter-readings/${connectionId}`
    );
  }

  getLatest(connectionId: string): Observable<MeterReadingResponse> {
    return this.http.get<MeterReadingResponse>(
      `${this.baseUrl}/meter-readings/latest/${connectionId}`
    );
  }

  getPrevious(connectionId: string): Observable<MeterReadingResponse> {
    return this.http.get<MeterReadingResponse>(
      `${this.baseUrl}/meter-readings/previous/${connectionId}`
    );
  }
}
