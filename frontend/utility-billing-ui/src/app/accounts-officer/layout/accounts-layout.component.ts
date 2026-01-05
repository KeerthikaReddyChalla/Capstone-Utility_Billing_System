import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accounts-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accounts-layout.html',
  styleUrl: './accounts-layout.css'
})
export class AccountsLayoutComponent {

  collapsed = false;

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}