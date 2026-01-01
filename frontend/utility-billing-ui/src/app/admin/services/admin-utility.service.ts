import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Utility } from '../models/utility.model';
import { Tariff } from '../models/tariff.model';
import { CreateTariffRequest } from '../models/create-tariff.model';

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

  getTariffs(): Observable<Tariff[]> {
    return this.http.get<Tariff[]>(`${this.baseUrl}/tariffs`);
  }

  createTariff(payload: CreateTariffRequest): Observable<Tariff> {
    return this.http.post<Tariff>(`${this.baseUrl}/tariffs`, payload);
  }

  deleteTariff(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tariffs/${id}`);
  }
}
