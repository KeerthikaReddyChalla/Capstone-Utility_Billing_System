import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class AccountsPaymentService {

  constructor(private http: HttpClient) {}

  getAllPayments() {
    return this.http.get<Payment[]>('http://localhost:9999/payments');
  }
}
