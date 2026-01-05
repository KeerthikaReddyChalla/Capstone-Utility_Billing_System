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
  loading = true;

  constructor(
    private service: BillingConnectionsService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ✅ ADD THIS
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

        // 🔥 THIS fixes the “click twice” issue
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addReading(connection: ConnectionBilling): void {
    this.router.navigate(
      ['/billing/readings'],
      {
        queryParams: {
          //connectionId: connection.connectionId,
          consumerId: connection.consumerId,
          utilityId: connection.utilityId
        }
      }
    );
  }
}
