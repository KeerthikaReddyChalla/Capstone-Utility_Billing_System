import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-billing-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //RouterOutlet,
    RouterLink,
    RouterLinkActive,
    
  ],
  templateUrl: './billing-layout.component.html',
  styleUrl: './billing-layout.component.css'
})
export class BillingLayoutComponent {
  sidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

