import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { BillingService } from '../../../billing-officer/services/billing.service';
import { BillResponse } from '../../../billing-officer/models/bill-response.model';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements OnInit {

  bills: BillResponse[] = [];

  totalRevenue = 0;
  totalOutstanding = 0;
  collectionRate = 0;

  constructor(
    private billService: BillingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.loadBills();
      this.cdr.detectChanges();
    
  }
    loadBills(): void {
    this.billService.getBills().subscribe(data => {
      this.bills = data;
      this.calculateStats();
      this.renderCharts();
      this.cdr.detectChanges();
    });
  }


  calculateStats(): void {
    const paidBills = this.bills.filter(b => b.status === 'PAID');
    const dueBills = this.bills.filter(
      b =>  b.status === 'DUE'
    );

    this.totalRevenue = paidBills.reduce(
      (sum, b) => sum + b.amount,
      0
    );

    this.totalOutstanding = dueBills.reduce(
      (sum, b) => sum + b.amount,
      0
    );

    const total = this.totalRevenue + this.totalOutstanding;
    this.collectionRate = total === 0
      ? 0
      : Math.round((this.totalRevenue / total) * 100);
  }

  renderCharts(): void {
    this.renderRevenueChart();
    this.renderOutstandingChart();
    this.renderConsumptionChart();
  }

  renderRevenueChart(): void {
    const revenueByMonth = new Map<string, number>();

    this.bills.forEach(b => {
      const month = new Date(b.billingCycle).toLocaleString('default', {
        month: 'short'
      });

      revenueByMonth.set(
        month,
        (revenueByMonth.get(month) || 0) + b.amount
      );
    });

    new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: Array.from(revenueByMonth.keys()),
        datasets: [{
          label: 'Revenue',
          data: Array.from(revenueByMonth.values()),
          backgroundColor: '#facc15'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  renderOutstandingChart(): void {
    const outstandingByUtility = new Map<string, number>();

    this.bills
      .filter(b => b.status !== 'PAID')
      .forEach(b => {
        outstandingByUtility.set(
          b.utilityName,
          (outstandingByUtility.get(b.utilityName) || 0) + b.amount
        );
      });

    new Chart('outstandingChart', {
      type: 'doughnut',
      data: {
        labels: Array.from(outstandingByUtility.keys()),
        datasets: [{
          data: Array.from(outstandingByUtility.values()),
          backgroundColor: [
            '#facc15',
            '#60a5fa',
            '#fb923c',
            '#a855f7'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%'
      }
    });
  }

  renderConsumptionChart(): void {
    const unitsByMonth = new Map<string, number>();

    this.bills.forEach(b => {
      const month = new Date(b.billingCycle).toLocaleString('default', {
        month: 'short'
      });

      unitsByMonth.set(
        month,
        (unitsByMonth.get(month) || 0) + b.unitsConsumed
      );
    });

    new Chart('consumptionChart', {
      type: 'line',
      data: {
        labels: Array.from(unitsByMonth.keys()),
        datasets: [{
          label: 'Units Consumed',
          data: Array.from(unitsByMonth.values()),
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22,163,74,0.15)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}