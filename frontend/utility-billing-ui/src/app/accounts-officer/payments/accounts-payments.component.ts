import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPaymentService } from '../services/accounts-payment.service';
import { Payment } from '../models/payment.model';

@Component({
  standalone: true,
  selector: 'app-accounts-payments',
  imports: [CommonModule],
  templateUrl: './payments.html',
  styleUrl: './payments.css'
})
export class AccountsPaymentsComponent implements OnInit {

  payments: Payment[] = [];
  loading = true;

  constructor(
    private service: AccountsPaymentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  private loadPayments(): void {
    this.loading = true;

    this.service.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;

 
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
