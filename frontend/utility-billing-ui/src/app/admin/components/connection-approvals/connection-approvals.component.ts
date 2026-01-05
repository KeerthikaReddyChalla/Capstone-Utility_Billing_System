import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminConnectionService } from '../../services/admin-connection.service';
import { ConnectionRequestResponse } from '../../models/connection-request-response.model';

@Component({
  selector: 'app-connection-approvals',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './connection-approvals.html',
  styleUrl: './connection-approvals.css'
})
export class ConnectionApprovalsComponent implements OnInit {

  requests: ConnectionRequestResponse[] = [];
  loading = false;

  showConfirmDialog = false;
  selectedRequest: ConnectionRequestResponse | null = null;
  action: 'APPROVE' | 'REJECT' | null = null;

  constructor(
    private service: AdminConnectionService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;

    this.service.getPendingRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load connection requests', 'error');
      }
    });
  }

  openConfirm(
    req: ConnectionRequestResponse,
    action: 'APPROVE' | 'REJECT'
  ): void {
    this.selectedRequest = req;
    this.action = action;
    this.showConfirmDialog = true;
    this.cdr.detectChanges();
  }

  closeConfirm(): void {
    this.showConfirmDialog = false;
    this.selectedRequest = null;
    this.action = null;
    this.cdr.detectChanges();
  }

  confirmAction(): void {
    if (!this.selectedRequest || !this.action) return;

    const status = this.action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    this.service.updateConnectionStatus(
      this.selectedRequest.id,
      status
    ).subscribe({
      next: () => {
        this.requests = this.requests.filter(
          r => r.id !== this.selectedRequest!.id
        );

        this.cdr.detectChanges();

        this.showToast(
          `Connection ${status.toLowerCase()} successfully`,
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
