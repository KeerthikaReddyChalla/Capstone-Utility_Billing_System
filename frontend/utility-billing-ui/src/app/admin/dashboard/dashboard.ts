import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { UtilitiesComponent } from '../components/utilities/utilities';
import { TariffsComponent } from '../components/tariffs/tariffs';

import { AdminService } from '../services/admin.service';
import { PendingUser } from '../models/pending-user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    NavbarComponent,
    UtilitiesComponent,
    TariffsComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent {

  /* ---------- TAB STATE ---------- */
  activeTab: 'approvals' | 'utilities' | 'tariffs' = 'approvals';

  /* ---------- APPROVAL STATE ---------- */
  pendingUsers: PendingUser[] = [];
  loading = false;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  /* ---------- LOAD PENDING USERS ---------- */
  openApprovals(): void {
    this.loading = true;
    this.pendingUsers = [];

    this.adminService.getPendingUsers().subscribe({
      next: (users) => {
        this.pendingUsers = users;
        this.loading = false;
        this.cdr.detectChanges();

        if (users.length === 0) {
          this.snackBar.open(
            'No pending users to approve',
            'OK',
            { duration: 3000 }
          );
        }
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.snackBar.open(
          'Failed to load pending users',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }

  /* ---------- APPROVE USER ---------- */
  approveUser(userId: string): void {
    this.adminService.approveUser(userId).subscribe({
      next: () => {
        this.pendingUsers = this.pendingUsers.filter(
          user => user.id !== userId
        );

        this.cdr.detectChanges();

        this.snackBar.open(
          'User approved successfully',
          'OK',
          { duration: 3000 }
        );
      },
      error: () => {
        this.snackBar.open(
          'Failed to approve user',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }

  /* ---------- DISAPPROVE (DELETE) USER ---------- */
  disapproveUser(userId: string): void {
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.pendingUsers = this.pendingUsers.filter(
          user => user.id !== userId
        );

        this.cdr.detectChanges();

        this.snackBar.open(
          'User disapproved and deleted',
          'OK',
          { duration: 3000 }
        );
      },
      error: () => {
        this.snackBar.open(
          'Failed to disapprove user',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }
}
