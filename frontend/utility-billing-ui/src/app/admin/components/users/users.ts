import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminUserService } from '../../services/admin-user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];

  search = '';
  roleFilter: 'ALL' | 'CONSUMER' | 'BILLING_OFFICER' | 'ACCOUNTS_OFFICER' = 'ALL';

  loading = false;

  /* ---------- CONFIRM DIALOG STATE ---------- */
  showConfirmDialog = false;
  selectedUser: User | null = null;

  constructor(
    private adminUserService: AdminUserService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /* ---------- LOAD USERS ---------- */
  loadUsers(): void {
    this.loading = true;

    this.adminUserService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load users', 'error');
      }
    });
  }

  /* ---------- FILTER ---------- */
  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesRole =
        this.roleFilter === 'ALL' || user.role === this.roleFilter;

      const matchesSearch =
        !this.search ||
        user.id.toLowerCase().includes(this.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.search.toLowerCase()) ||
        user.name.toLowerCase().includes(this.search.toLowerCase());

      return matchesRole && matchesSearch;
    });

    this.cdr.detectChanges();
  }

  /* ---------- OPEN CONFIRM ---------- */
  openDeleteConfirm(user: User): void {
    this.selectedUser = user;
    this.showConfirmDialog = true;
    this.cdr.detectChanges();
  }

  /* ---------- CLOSE CONFIRM ---------- */
  closeConfirm(): void {
    this.showConfirmDialog = false;
    this.selectedUser = null;
    this.cdr.detectChanges();
  }

  /* ---------- CONFIRM DELETE ---------- */
  confirmDelete(): void {
    if (!this.selectedUser) return;

    const userId = this.selectedUser.id;

    this.adminUserService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== userId);
        this.applyFilters();

        this.showToast('User deleted successfully', 'success');
        this.closeConfirm();
      },
      error: () => {
        this.showToast('Failed to delete user', 'error');
        this.closeConfirm();
      }
    });
  }

  /* ---------- TOAST ---------- */
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
