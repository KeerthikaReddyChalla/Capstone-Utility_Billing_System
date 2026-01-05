import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ConsumerService } from '../../services/consumer.service';
import { TokenService } from '../../../core/auth/token.service';
import { Connection } from '../../models/connection.model';

@Component({
  selector: 'app-create-connection',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './create-connection.html',
  styleUrl: './create-connection.css'
})
export class CreateConnectionComponent implements OnInit {

  form = {
    utilityId: '',
    tariffType: ''
  };

  utilities: { id: string; name: string }[] = [];
  connections: Connection[] = [];

  submitted = false;
  loadingConnections = false;

  constructor(
    private consumerService: ConsumerService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUtilities();
    this.loadConnections();
  }

  loadUtilities(): void {
    this.consumerService.getUtilities().subscribe({
      next: (data) => {
        this.utilities = data;
      },
      error: () => {
        this.showToast('Failed to load utilities', 'error');
      }
    });
  }

  onUtilitySelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.form.utilityId = select.value;
  }

  submit(): void {
    const consumerId = this.tokenService.getUserId();
    if (!consumerId) return;

    if (!this.form.utilityId || !this.form.tariffType) {
      this.showToast('Please select utility and tariff', 'error');
      return;
    }

    const payload = {
      consumerId,
      utilityId: this.form.utilityId,
      tariffType: this.form.tariffType
    };

    this.consumerService.requestConnection(payload).subscribe({
      next: () => {
        this.submitted = true;
        this.form = { utilityId: '', tariffType: '' };

        this.showToast(
          'Connection request submitted for approval',
          'success'
        );

        this.loadConnections();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.showToast(
          err.error?.message || 'Connection request failed',
          'error'
        );
      }
    });
  }

  loadConnections(): void {
    const consumerId = this.tokenService.getUserId();
    if (!consumerId) return;

    this.loadingConnections = true;

    this.consumerService.getConnectionsByConsumer(consumerId).subscribe({
      next: (data) => {
        this.connections = data;
        this.loadingConnections = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingConnections = false;
        this.showToast('Failed to load connections', 'error');
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

  private isApproved(): boolean {
    return localStorage.getItem('approved') === 'true';
  }
}
