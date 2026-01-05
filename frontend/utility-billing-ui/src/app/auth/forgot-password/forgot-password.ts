import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPasswordComponent {

  email = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  sendResetLink() {

    if (!this.email) {
      this.showToast('Please enter your email', 'error');
      return;
    }

    this.loading = true;

    this.http.post(
      'http://localhost:9999/auth/forgot-password',
      { email: this.email }
    ).subscribe({
      next: () => {
        this.loading = false;

        this.showToast(
          'Reset link sent to your email',
          'success'
        );
      },
      error: () => {
        this.loading = false;

        this.showToast(
          'Email not found or not registered',
          'error'
        );
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
