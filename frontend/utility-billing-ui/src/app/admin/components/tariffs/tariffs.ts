import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminUtilityService } from '../../services/admin-utility.service';
import { TariffResponse } from '../../models/tariff-response.model';
import { CreateTariffRequest } from '../../models/create-tariff.model';

@Component({
  selector: 'app-tariffs',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './tariffs.html',
  styleUrl: './tariffs.css'
})
export class TariffsComponent implements OnInit {

  tariffs: TariffResponse[] = [];
  loading = false;

  // Create form
  tariffForm: CreateTariffRequest = {
    utilityId: '',
    name: '',
    ratePerUnit: 0,
    effectiveFrom: ''
  };

  // Update state
  editingTariff: TariffResponse | null = null;

  constructor(
    private adminService: AdminUtilityService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTariffs();
  }

  /* ---------- LOAD ---------- */
  loadTariffs(): void {
    this.loading = true;

    this.adminService.getTariffs().subscribe({
      next: (data) => {
  console.log('Tariff API response:', data);
  this.tariffs = data;
  this.loading = false;
  this.cdr.detectChanges();
    },

      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load tariffs', 'Close', { duration: 3000 });
      }
    });
  }

  /* ---------- CREATE ---------- */
createTariff(): void {
  if (!this.tariffForm.effectiveFrom) {
    this.snackBar.open('Effective date is required', 'Close', { duration: 3000 });
    return;
  }

  const payload: CreateTariffRequest = {
    ...this.tariffForm,
    effectiveFrom: new Date(this.tariffForm.effectiveFrom).toISOString()
  };

  this.adminService.createTariff(payload).subscribe({
    next: (created) => {
      this.tariffs.unshift(created);
      this.cdr.detectChanges();

      this.snackBar.open('Tariff created successfully', 'OK', { duration: 3000 });

      this.tariffForm = {
        utilityId: '',
        name: '',
        ratePerUnit: 0,
        effectiveFrom: ''
      };
    },
    error: () => {
      this.snackBar.open('Failed to create tariff', 'Close', { duration: 3000 });
    }
  });
}



  /* ---------- EDIT ---------- */
  startEdit(tariff: TariffResponse): void {
    this.editingTariff = { ...tariff };
  }

  cancelEdit(): void {
    this.editingTariff = null;
  }

  updateTariff(): void {
  if (!this.editingTariff) return;

  const payload = {
    name: this.editingTariff.name,
    ratePerUnit: this.editingTariff.ratePerUnit,
    effectiveFrom: this.editingTariff.effectiveFrom
      ? this.editingTariff.effectiveFrom.toISOString()
      : undefined
  };

  this.adminService.updateTariff(this.editingTariff.id, payload).subscribe({
    next: (updated) => {
      const index = this.tariffs.findIndex(t => t.id === updated.id);
      this.tariffs[index] = updated;

      this.editingTariff = null;
      this.cdr.detectChanges();

      this.snackBar.open('Tariff updated successfully', 'OK', { duration: 3000 });
    },
    error: () => {
      this.snackBar.open('Failed to update tariff', 'Close', { duration: 3000 });
    }
  });
}


  deleteTariff(tariffId: string): void {
  this.adminService.deleteTariff(tariffId).subscribe({
    next: () => {
      this.tariffs = this.tariffs.filter(t => t.id !== tariffId);
      this.cdr.detectChanges();

      this.snackBar.open(
        'Tariff deleted successfully',
        'OK',
        { duration: 3000 }
      );
    },
    error: () => {
      this.snackBar.open(
        'Failed to delete tariff',
        'Close',
        { duration: 3000 }
      );
    }
  });
}

}
