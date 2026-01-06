import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TokenService } from '../../core/auth/token.service';
import { LoginRequest } from '../../core/auth/models/login-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterLink, RouterModule]
})
export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  loading = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {


    if (!this.loginData.email || !this.loginData.password) {
      this.showToast('Email and password are required', 'error');
      return;
    }

    this.loading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {

        this.tokenService.saveToken(response.token);
        this.tokenService.saveUserId(response.userId);

        const role = this.tokenService.getRole();
        console.log('Logged in role:', role);

        this.loading = false;

        if (role) {
          this.showToast('Login successful', 'success');
          this.redirectByRole(role);
        } else {
          this.showToast('Unable to determine user role', 'error');
        }
      },

      error: () => {
  this.loading = false;

  if (!this.isApproved()) {
    this.showToast(
      'Your account is pending admin approval. Please wait.',
      'error'
    );
  } else {
    this.showToast('Invalid email or password', 'error');
  }
}


    });
  }

  private redirectByRole(role: string | null): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;

      case 'BILLING_OFFICER':
        this.router.navigate(['/billing/reports']);
        break;

      case 'ACCOUNTS_OFFICER':
        this.router.navigate(['/accounts']);
        break;

      case 'CONSUMER':
        this.router.navigate(['/consumer/home']);
        break;

      default:
        this.router.navigate(['/']);
    }
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
  private isApproved(): boolean {
  return localStorage.getItem('approved') === 'true';
}
goToForgotPassword() {
  this.router.navigate(['/forgot-password']);
}
}
