import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumer-home.html',
  styleUrl: './consumer-home.css'
})
export class ConsumerHomeComponent {

  constructor(private router: Router) {}

  createConnection(): void {
    this.router.navigate(['/consumer/connections/new']);
  }

  tariffs = [
    {
      title: 'Residential Flat',
      desc: 'Simple pricing for homes',
      price: '₹5 / unit',
      fixed: '₹50 fixed charge'
    },
    {
      title: 'Residential Slab',
      desc: 'Tiered pricing for high usage',
      price: 'Slab based',
      fixed: '₹75 fixed charge'
    },
    {
      title: 'Commercial Standard',
      desc: 'For shops & offices',
      price: '₹8 / unit',
      fixed: '₹150 fixed charge'
    },
    {
      title: 'Government Subsidized',
      desc: 'Low-income / agriculture',
      price: '₹2 / unit',
      fixed: 'No fixed charge'
    }
  ];
}
