import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminService } from '../services/admin.service';
import { PendingUser } from '../models/pending-user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent {

  pendingUsers: PendingUser[] = [];
  loading = false;

  /* CONFIRM DIALOG */
  showConfirmDialog = false;
  selectedUser: PendingUser | null = null;
  action: 'APPROVE' | 'DISAPPROVE' | null = null;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  openApprovals(): void {
    this.loading = true;
    this.pendingUsers = [];

    this.adminService.getPendingUsers().subscribe({
      next: (users) => {
        this.pendingUsers = users;
        this.loading = false;
        this.cdr.detectChanges();

        if (users.length === 0) {
          this.showToast('No pending users to approve', 'success');
        }
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load pending users', 'error');
      }
    });
  }

  openConfirm(user: PendingUser, action: 'APPROVE' | 'DISAPPROVE') {
    this.selectedUser = user;
    this.action = action;
    this.showConfirmDialog = true;
  }

  closeConfirm() {
    this.showConfirmDialog = false;
    this.selectedUser = null;
    this.action = null;
  }

  confirmAction(): void {
    if (!this.selectedUser || !this.action) return;

    const id = this.selectedUser.id;

    const obs =
      this.action === 'APPROVE'
        ? this.adminService.approveUser(id)
        : this.adminService.deleteUser(id);

    obs.subscribe({
      next: () => {
        this.pendingUsers = this.pendingUsers.filter(u => u.id !== id);
        this.cdr.detectChanges();

        this.showToast(
          `User ${this.action === 'APPROVE' ? 'approved' : 'disapproved'} successfully`,
          'success'
        );

        this.closeConfirm();
      },
      error: () => {
        this.showToast('Action failed', 'error');
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
