import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable({ providedIn: 'root' })
export class AccountsBillService {

  constructor(private http: HttpClient) {}

  getAllBills() {
    return this.http.get<Bill[]>('http://localhost:9999/bills');
  }

  sendReminder(billId: string) {
    return this.http.post(
      `http://localhost:9999/bills/${billId}/send-reminder`,
      {}
    );
  }
}
