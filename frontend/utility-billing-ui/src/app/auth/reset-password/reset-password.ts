import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent {

  token = '';
  newPassword = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  resetPassword() {
    if (!this.newPassword) {
      this.showToast('Password cannot be empty', 'error');
      return;
    }
    if (this.newPassword.length < 8) {
    this.showToast(
      'Password must be at least 8 characters long',
      'error'
    );
    return;
  }

    this.loading = true;

    this.http.post(
      'http://localhost:9999/auth/reset-password',
      {
        token: this.token,
        newPassword: this.newPassword
      }
    ).subscribe({
      next: () => {
        this.loading = false;

       
        this.showToast(
          'Password reset successful. Redirecting to login...',
          'success'
        );

     
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.loading = false;
        this.showToast(
          'Invalid or expired reset link',
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
