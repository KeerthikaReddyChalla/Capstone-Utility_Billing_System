import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterLink, RouterModule]
})
export class RegisterComponent {

  registerData = {
    name: '',
    email: '',
    password: '',
    role: 'CONSUMER'
  };

  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {

    /* ---------- BASIC VALIDATIONS ---------- */
    if (!this.registerData.name.trim()) {
      this.showToast('Full name is required', 'error');
      return;
    }

    if (!this.registerData.email.trim()) {
      this.showToast('Email is required', 'error');
      return;
    }

    if (!this.isValidEmail(this.registerData.email)) {
      this.showToast('Please enter a valid email', 'error');
      return;
    }

    if (!this.registerData.password || this.registerData.password.length < 6) {
      this.showToast('Password must be at least 6 characters', 'error');
      return;
    }

    this.loading = true;

    /* ---------- API CALL ---------- */
    this.http.post(
      'http://localhost:9999/auth/register',
      this.registerData
    ).subscribe({
      next: () => {
        this.loading = false;

        // store pending email for approval polling
        localStorage.setItem('pending_email', this.registerData.email);

        this.showToast(
          'Registration successful! Waiting for admin approval.',
          'success'
        );

        setTimeout(() => {
          this.router.navigate(['/pending']);
        }, 1200);
      },

      error: (err: HttpErrorResponse) => {
        this.loading = false;

        if (err.status === 400 || err.error?.message?.toLowerCase().includes('exists')) {
          this.showToast('User already exists. Please login.', 'error');
        } else {
          this.showToast('Registration failed. Please try again.', 'error');
        }
      }
    });
  }

  /* ---------- HELPERS ---------- */

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
