import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Utility } from '../models/utility.model';
import { CreateTariffRequest } from '../models/create-tariff.model';
import { UpdateTariffRequest } from '../models/UpdateTariffRequest';
import { Tariff } from '../models/tariff.model';
import { map } from 'rxjs/operators';
import { TariffResponse } from '../models/tariff-response.model';

@Injectable({ providedIn: 'root' })
export class AdminUtilityService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* ---------- UTILITIES ---------- */

  getUtilities(): Observable<Utility[]> {
    return this.http.get<Utility[]>(`${this.baseUrl}/utilities`);
  }

  createUtility(payload: any): Observable<Utility> {
    return this.http.post<Utility>(`${this.baseUrl}/utilities`, payload);
  }
  

  deleteUtility(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/utilities/${id}`);
  }

  /* ---------- TARIFFS ---------- */



getTariffs(): Observable<TariffResponse[]> {
  return this.http.get<any[]>(`${this.baseUrl}/tariffs`).pipe(
    map(tariffs =>
      tariffs.map(t => ({
        ...t,
        effectiveFrom: t.effectiveFrom ? new Date(t.effectiveFrom) : null
      }))
    )
  );
}



createTariff(payload: CreateTariffRequest): Observable<TariffResponse> {
  return this.http.post<any>(`${this.baseUrl}/tariffs`, payload).pipe(
    map(t => ({
      ...t,
      effectiveFrom: t.effectiveFrom ? new Date(t.effectiveFrom) : null
    }))
  );
}


  deleteTariff(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tariffs/${id}`);
  }
 
  updateTariff(
  id: string,
  payload: UpdateTariffRequest
): Observable<TariffResponse> {
  return this.http.put<any>(`${this.baseUrl}/tariffs/${id}`, payload).pipe(
    map(t => ({
      ...t,
      effectiveFrom: t.effectiveFrom ? new Date(t.effectiveFrom) : null
    }))
  );
}



}
