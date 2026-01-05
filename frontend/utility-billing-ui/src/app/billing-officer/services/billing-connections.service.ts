import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConnectionBilling } from '../models/connection-billing.model';

@Injectable({
  providedIn: 'root'
})
export class BillingConnectionsService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all connections for Billing Officer dashboard
   */
  getAllConnections(): Observable<ConnectionBilling[]> {
    return this.http.get<ConnectionBilling[]>(
      `${this.baseUrl}/bills/connections/without-readings`
    );
  }
}
