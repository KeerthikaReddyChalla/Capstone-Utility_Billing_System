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

  constructor(
    private utilityService: AdminUtilityService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUtilities();
  }

  /* ---------- LOAD UTILITIES ---------- */
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
        this.cdr.detectChanges();
        this.snackBar.open(
          'Failed to load utilities',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }

  /* ---------- CREATE UTILITY ---------- */
  createUtility(): void {
    if (!this.utilityForm.name.trim()) {
      this.snackBar.open('Utility name is required', 'Close', { duration: 3000 });
      return;
    }

    this.utilityService.createUtility(this.utilityForm).subscribe({
      next: (created) => {

        this.utilities.unshift(created);
        this.cdr.detectChanges();

        this.snackBar.open(
          'Utility created successfully',
          'OK',
          { duration: 3000 }
        );

        // reset form
        this.utilityForm = { name: '', description: '' };
      },
      error: () => {
        this.snackBar.open(
          'Failed to create utility',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }
  deleteUtility(id: string): void {
  this.utilityService.deleteUtility(id).subscribe({
    next: () => {

      this.utilities = this.utilities.filter(u => u.id !== id);
      this.cdr.detectChanges();

      this.snackBar.open(
        'Utility deleted successfully',
        'OK',
        { duration: 3000 }
      );
    },
    error: () => {
      this.snackBar.open(
        'Failed to delete utility',
        'Close',
        { duration: 3000 }
      );
    }
  });
}

}
