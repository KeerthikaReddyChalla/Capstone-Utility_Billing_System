import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { TokenService } from '../../../core/auth/token.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  standalone: true,
  selector: 'app-consumer-payment',
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './consumer-payment.component.html',
  styleUrl: './consumer-payment.component.css'
})
export class ConsumerPaymentComponent implements OnInit {

  billId!: string;
  amount = 0;

  otp = '';
  otpSent = false;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private tokenService: TokenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

 ngOnInit(): void {
  this.billId = this.route.snapshot.paramMap.get('billId')!;

  const nav = this.router.getCurrentNavigation();
  this.amount =
    nav?.extras.state?.['amount'] ??
    history.state?.amount ??
    0;
}


 sendOtp(): void {
  if (this.otpSent) {
    return; 
  }

  const email = this.tokenService.getEmail();
  if (!email) {
    this.showToast('Email not found. Please login again.', 'error');
    return;
  }

  this.otpSent = true; 

  this.paymentService.sendOtp(email).subscribe({
    next: () => {
      this.showToast('OTP sent to your email', 'success');
    },
    error: () => {
      this.otpSent = false; // unlock on failure
      this.showToast('Failed to send OTP', 'error');
    }
  });
}


verifyAndPay() {
  const email = this.tokenService.getEmail();
  const consumerId = this.tokenService.getUserId();

  if (!email || !consumerId) {
    this.showToast('Session expired. Please login again.', 'error');
    return;
  }

  const payload = {
    billId: this.billId,
    consumerId: consumerId,
    email: email,
    otp: this.otp,
    amount: this.amount
  };

  this.paymentService.verifyOtpAndPay(payload).subscribe({
    next: () => {
      this.showToast('Payment successful!', 'success');
      this.router.navigate(['/consumer/bills']);
    },
    error: () => {
      this.showToast('Invalid OTP or payment failed', 'error');
    }
  });
}
 private showToast(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success'
        ? ['toast-success']
        : ['toast-error']
    });
  }
}
