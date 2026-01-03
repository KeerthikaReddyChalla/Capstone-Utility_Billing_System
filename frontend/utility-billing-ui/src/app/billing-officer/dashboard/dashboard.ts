import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillingService } from '../services/billing.service';
import { BillResponse } from '../models/bill-response.model';
import { Chart } from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class BillingDashboardComponent implements OnInit, AfterViewInit {

  bills: BillResponse[] = [];

  stats = {
    totalBills: 0,
    pending: 0,
    overdue: 0,
    totalConsumption: 0
  };

  constructor(private billingService: BillingService, private snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBills();
  }

  ngAfterViewInit(): void {}

  loadBills(): void {
    this.billingService.getBills().subscribe(data => {
      this.bills = data;
      this.calculateStats();
      this.renderCharts();
      this.cdr.detectChanges();
    });
  }

  calculateStats(): void {
    this.stats.totalBills = this.bills.length;
    this.stats.pending = this.bills.filter(b => b.status === 'DUE').length;
    this.stats.overdue = this.bills.filter(b => b.status === 'OVERDUE').length;
    this.stats.totalConsumption =
      this.bills.reduce((sum, b) => sum + b.unitsConsumed, 0);
  }

  renderCharts(): void {
    this.renderConsumptionTrend();
    this.renderUtilitySplit();
  }

  renderConsumptionTrend(): void {
    new Chart('consumptionChart', {
      type: 'line',
      data: {
        labels: this.bills.map(b => b.billingCycle),
        datasets: [{
          label: 'Units Consumed',
          data: this.bills.map(b => b.unitsConsumed),
          borderColor: '#2f855a',
          backgroundColor: 'rgba(47,133,90,0.15)',
          fill: true,
          tension: 0.4
        }]
      }
    });
  }

  renderUtilitySplit(): void {
    const utilityMap: any = {};

    this.bills.forEach(b => {
      utilityMap[b.utilityName] =
        (utilityMap[b.utilityName] || 0) + b.unitsConsumed;
    });

    new Chart('utilityChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(utilityMap),
        datasets: [{
          data: Object.values(utilityMap),
          backgroundColor: ['#ecc94b', '#4299e1', '#ed8936', '#9f7aea']
        }]
      }
    });
  }
}
