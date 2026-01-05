import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BillResponse } from '../../billing-officer/models/bill-response.model';
import { Connection } from '../models/connection.model';
@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* ===============================
     AUTH / PROFILE
     =============================== */

  // Used for pending-approval polling
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/profile`);
  }

  /* ===============================
     TARIFFS (for home cards)
     =============================== */

  getTariffs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tariffs`);
  }

  /* ===============================
     CONNECTIONS
     =============================== */

  // createConnection(payload: {
  //   consumerId: string;
  //   utilityId: string;
  //   tariffType: string;
  // }): Observable<any> {
  //   return this.http.post(
  //     `${this.baseUrl}/connections`,
  //     payload
  //   );
  // }

 
  getConnectionsByConsumer(consumerId: string): Observable<Connection[]> {
    return this.http.get<Connection[]>(
      `${this.baseUrl}/connections/${consumerId}`
    );
  }
  requestConnection(payload: {
  consumerId: string;
  utilityId: string;
  tariffType: string;
}) {
  return this.http.post(
    `${this.baseUrl}/connections/request`,
    payload
  );
}
getBillsByConsumer(consumerId: string): Observable<BillResponse[]> {
    return this.http.get<BillResponse[]>(
      `${this.baseUrl}/bills/consumer/${consumerId}`
    );
  }
  getUtilities() {
  return this.http.get<{ id: string; name: string }[]>(
    `${this.baseUrl}/utilities`,
  
  );
}
getPendingStatus(email: string) {
  return this.http.get<boolean>(
    `http://localhost:9999/auth/pending-status?email=${email}`
  );
}



}
