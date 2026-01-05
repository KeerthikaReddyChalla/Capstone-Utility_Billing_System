import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsBillService } from '../services/accounts-bill.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-accounts-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AccountsDashboardComponent implements OnInit {

  totalBills = 0;
  paidBills = 0;
  overdueBills = 0;
  totalRevenue = 0;

  private paymentChart?: Chart; 

  constructor(private billService: AccountsBillService) {}

  ngOnInit(): void {
    this.billService.getAllBills().subscribe(bills => {
      this.totalBills = bills.length;
      this.paidBills = bills.filter(b => b.status === 'PAID').length;
      this.overdueBills = bills.filter(b => b.status === 'OVERDUE').length;
      this.totalRevenue = bills
        .filter(b => b.status === 'PAID')
        .reduce((sum, b) => sum + b.amount, 0);

      this.loadChart();
    });
  }

  private loadChart(): void {

    if (this.paymentChart) {
      this.paymentChart.destroy();
    }

    this.paymentChart = new Chart('paymentChart', {
      type: 'bar',
      data: {
        labels: ['Paid Bills', 'Overdue Bills'],
        datasets: [{
          label: 'Bills Count',
          data: [this.paidBills, this.overdueBills],
          backgroundColor: ['#16a34a', '#dc2626'],
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}
