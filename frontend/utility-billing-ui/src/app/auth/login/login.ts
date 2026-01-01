import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TokenService } from '../../core/auth/token.service';
import { LoginRequest } from '../../core/auth/models/login-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.tokenService.saveToken(response.token);

        const role = this.tokenService.getRole();

        if (role) {
          this.redirectByRole(role);
        } else {
          this.errorMessage = 'Unable to determine user role';
          this.loading = false;
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
        this.loading = false;
      }
    });
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'BILLING_OFFICER':
        this.router.navigate(['/billing']);
        break;
      case 'ACCOUNTS_OFFICER':
        this.router.navigate(['/accounts']);
        break;
      case 'CONSUMER':
        this.router.navigate(['/consumer']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
