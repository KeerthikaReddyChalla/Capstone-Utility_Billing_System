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

  pagedUsers: User[] = [];
  currentPage = 1;
  pageSize = 8;        
  totalPages = 0;

  search = '';
  roleFilter: 'ALL' | 'CONSUMER' | 'BILLING_OFFICER' | 'ACCOUNTS_OFFICER' = 'ALL';

  loading = false;

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

    this.currentPage = 1;
    this.updatePagination();

    this.cdr.detectChanges();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  openDeleteConfirm(user: User): void {
    this.selectedUser = user;
    this.showConfirmDialog = true;
    this.cdr.detectChanges();
  }

  closeConfirm(): void {
    this.showConfirmDialog = false;
    this.selectedUser = null;
    this.cdr.detectChanges();
  }

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
