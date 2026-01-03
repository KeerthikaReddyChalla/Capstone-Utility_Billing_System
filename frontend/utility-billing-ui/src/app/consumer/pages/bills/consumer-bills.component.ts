import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerService } from '../../services/consumer.service';
import { TokenService } from '../../../core/auth/token.service';
import { BillResponse } from '../../../billing-officer/models/bill-response.model';

@Component({
  selector: 'app-consumer-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumer-bills.component.html',
  styleUrl: './consumer-bills.component.css'
})
export class ConsumerBillsComponent implements OnInit {

  bills: BillResponse[] = [];
  loading = true;

  constructor(
    private consumerService: ConsumerService,
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const consumerId = this.tokenService.getUserId();

    if (!consumerId) {
      this.loading = false;
      return;
    }

    this.consumerService.getBillsByConsumer(consumerId).subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  makePayment(bill: BillResponse): void {
    console.log('Make payment for bill:', bill.id);
    // Payment flow comes later (PayPal / Razorpay / Stripe)
  }
}
