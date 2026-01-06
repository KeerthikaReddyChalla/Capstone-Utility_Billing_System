import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminUtilityService } from '../../services/admin-utility.service';
import { UtilityRequest } from '../../models/utility-request.model';
import { UtilityResponse } from '../../models/utility-response.model';

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './utilities.html',
  styleUrl: './utilities.css'
})
export class UtilitiesComponent implements OnInit {

  utilities: UtilityResponse[] = [];
  loading = false;

  utilityForm: UtilityRequest = {
    name: '',
    description: ''
  };

  showConfirm = false;
  selectedUtility: UtilityResponse | null = null;

  constructor(
    private utilityService: AdminUtilityService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUtilities();
  }

  loadUtilities(): void {
    this.loading = true;

    this.utilityService.getUtilities().subscribe({
      next: (data) => {
        this.utilities = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load utilities', 'error');
      }
    });
  }

  createUtility(): void {
    if (!this.utilityForm.name.trim()) {
      this.showToast('Utility name is required', 'error');
      return;
    }

    this.utilityService.createUtility(this.utilityForm).subscribe({
      next: (created) => {
        this.utilities.unshift(created);
        this.utilityForm = { name: '', description: '' };
        this.cdr.detectChanges();
        this.showToast('Utility created successfully', 'success');
      },
      error: () => {
        this.showToast('Failed to create utility', 'error');
      }
    });
  }

  openDeleteConfirm(utility: UtilityResponse): void {
    this.selectedUtility = utility;
    this.showConfirm = true;
  }

  closeConfirm(): void {
    this.showConfirm = false;
    this.selectedUtility = null;
  }

  confirmDelete(): void {
    if (!this.selectedUtility) return;

    this.utilityService.deleteUtility(this.selectedUtility.id).subscribe({
      next: () => {
        this.utilities = this.utilities.filter(
          u => u.id !== this.selectedUtility!.id
        );
        this.cdr.detectChanges();
        this.showToast('Utility deleted successfully', 'success');
        this.closeConfirm();
      },
      error: () => {
        this.showToast('Failed to delete utility', 'error');
        this.closeConfirm();
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
