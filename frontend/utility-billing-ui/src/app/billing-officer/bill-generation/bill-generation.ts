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
      this.snackBar.open('All fields are required', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;

    this.billingService.generateBill(this.billForm).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Bill generated successfully', 'OK', {
          duration: 3000
        });

        this.billForm = {
          connectionId: '',
          billingCycle: ''
        };

        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to generate bill', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
