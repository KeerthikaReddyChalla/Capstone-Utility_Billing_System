import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from '../../services/consumer.service';
@Component({
  selector: 'app-pending-approval',
  standalone: true,
  templateUrl: './pending-approval.html',
  styleUrl: './pending-approval.css'
})
export class PendingApprovalComponent implements OnInit {

  constructor(
    private consumerService: ConsumerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pollStatus();
    setInterval(() => this.pollStatus(), 5000);
  }

  pollStatus(): void {
    this.consumerService.getProfile().subscribe(user => {
      if (user.enabled) {
        this.router.navigate(['/consumer/home']);
      }
    });
  }
}
