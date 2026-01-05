import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsBillService } from '../services/accounts-bill.service';
import { Bill } from '../models/bill.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-accounts-bills',
  imports: [CommonModule],  templateUrl: './bills.html',
  styleUrl: './bills.css'
})
export class AccountsBillsComponent implements OnInit {

  bills: Bill[] = [];
  loading=true;
  constructor(
    private billService: AccountsBillService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
    this.loadBills();
  }

  private loadBills(): void {
    this.loading = true;

    this.billService.getAllBills().subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  sendReminder(billId: string) {
    this.billService.sendReminder(billId).subscribe(() => {
      this.showToast('Reminder email sent', 'success');
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
