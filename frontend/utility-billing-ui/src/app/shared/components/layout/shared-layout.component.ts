import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { TokenService } from '../../../core/auth/token.service';
@Component({
  selector: 'app-shared-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shared-layout.component.html',
  styleUrl: './shared-layout.component.css'
})
export class SharedLayoutComponent {

  collapsed = true; 
  role: string | null = null;

  showLogoutConfirm = false;

  constructor(
    private authService: AuthService,
    private tokanService: TokenService,
    private router: Router
  ) {
    this.role = this.tokanService.getRole();
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  openLogoutConfirm(): void {
    this.showLogoutConfirm = true;
  }

  closeLogoutConfirm(): void {
    this.showLogoutConfirm = false;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  hasRole(r: string): boolean {
    return this.role === r;
  }
}
