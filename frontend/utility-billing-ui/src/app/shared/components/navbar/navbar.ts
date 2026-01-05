import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { TokenService } from '../../../core/auth/token.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {

  constructor(private tokenService: TokenService) {}

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  isApproved(): boolean {
    const approved = localStorage.getItem('approved');
    return approved === 'true';
  }
}

