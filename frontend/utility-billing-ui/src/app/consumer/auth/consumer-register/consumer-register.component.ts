import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-consumer-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumer-register.html',
  styleUrl: './consumer-register.css'
})
export class ConsumerRegisterComponent {

  form = {
    name: '',
    email: '',
    password: ''
  };

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    if (!this.form.name || !this.form.email || !this.form.password) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';

    // 🚫 NO ROLE SENT
    const payload = {
      name: this.form.name,
      email: this.form.email,
      password: this.form.password
    };

    this.authService.registerConsumer(payload).subscribe({
      next: () => {
        this.router.navigate(['/consumer/pending']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Registration failed. Email may already exist.';
      }
    });
  }
}