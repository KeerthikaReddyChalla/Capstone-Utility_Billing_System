import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingConnectionsService } from '../services/billing-connections.service';
import { ConnectionBilling } from '../models/connection-billing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connections.html',
  styleUrls: ['./connections.css']
})
export class ConnectionsComponent implements OnInit {

  connections: ConnectionBilling[] = [];

  pagedConnections: ConnectionBilling[] = [];
  currentPage = 1;
  pageSize = 6;   
  totalPages = 0;

  loading = true;

  constructor(
    private service: BillingConnectionsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadConnections();
  }

  private loadConnections(): void {
    this.loading = true;

    this.service.getAllConnections().subscribe({
      next: (data) => {
        this.connections = data;
        this.loading = false;

        this.currentPage = 1;
        this.updatePagination();

        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.connections.length / this.pageSize);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedConnections = this.connections.slice(start, end);
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

  addReading(connection: ConnectionBilling): void {
    this.router.navigate(
      ['/billing/readings'],
      {
        queryParams: {
          consumerId: connection.consumerId,
          utilityId: connection.utilityId
        }
      }
    );
  }
}
