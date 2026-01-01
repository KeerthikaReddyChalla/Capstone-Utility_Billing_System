import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PendingUser } from '../models/pending-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // GET /auth/users/pending
  getPendingUsers(): Observable<PendingUser[]> {
    return this.http.get<PendingUser[]>(`${this.baseUrl}/users/pending`);
  }

  // PUT /auth/users/{userId}/approve
  approveUser(userId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/approve`, {});
  }
  deleteUser(userId: string) {
  return this.http.delete<void>(
    `${this.baseUrl}/users/${userId}`
  );
}
}
