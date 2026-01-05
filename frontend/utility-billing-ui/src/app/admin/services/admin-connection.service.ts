import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ConnectionRequest } from '../models/connection-request.model';
import { ConnectionRequestResponse } from '../models/connection-request-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminConnectionService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** GET pending connection requests */
  getPendingRequests(): Observable<ConnectionRequestResponse[]> {
    return this.http.get<ConnectionRequestResponse[]>(
      `${this.baseUrl}/connections/requests/pending`
    );
  }

  /** APPROVE or REJECT request */
  updateConnectionStatus(
    requestId: string,
    status: 'APPROVED' | 'REJECTED'
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/connections/requests/${requestId}`,
      { status }
    );
  }
  approveRequest(requestId: string) {
  return this.http.put(
    `${this.baseUrl}/connections/requests/${requestId}`,
    { status: 'APPROVED' }
  );
}

rejectRequest(requestId: string) {
  return this.http.put(
    `${this.baseUrl}/connections/requests/${requestId}`,
    { status: 'REJECTED' }
  );
}


}
