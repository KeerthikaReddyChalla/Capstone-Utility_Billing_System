import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BillingService } from '../services/billing.service';
import { GenerateBillRequest } from '../models/generate-bill.model';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './bill-generation.html',
  styleUrl: './bill-generation.css'
})
export class BillGenerationComponent {

  loading = false;

  billForm: GenerateBillRequest = {
    connectionId: '',
    billingCycle: ''
  };

  constructor(
    private billingService: BillingService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  generate(): void {
    if (!this.billForm.connectionId || !this.billForm.billingCycle) {
      this.showToast('All fields are required', 'error');
      return;
    }

    this.loading = true;

    this.billingService.generateBill(this.billForm).subscribe({
      next: () => {
        this.loading = false;
        this.showToast('Bill generated successfully', 'success');

        this.billForm = {
          connectionId: '',
          billingCycle: ''
        };

        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to generate bill', 'error');
      }
    });
  }
   /* ---------- TOAST ---------- */
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
