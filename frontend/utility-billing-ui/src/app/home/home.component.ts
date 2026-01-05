import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/components/navbar/navbar';
import { TokenService } from '../core/auth/token.service';
import { RouterModule, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private tokenService: TokenService) {}
  
    isLoggedIn(): boolean {
      return !!this.tokenService.getToken();
    }
  
    isApproved(): boolean {
      const approved = localStorage.getItem('approved');
      return approved === 'true';
    }
}
