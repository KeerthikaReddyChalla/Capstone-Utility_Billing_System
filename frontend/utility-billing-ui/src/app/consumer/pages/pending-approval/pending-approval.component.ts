import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from '../../services/consumer.service';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports:[LottieComponent, CommonModule],
  templateUrl: './pending-approval.html',
  styleUrl: './pending-approval.css'
})
export class PendingApprovalComponent implements OnInit, OnDestroy {

  private intervalId: any;
  email: string | null = null;

  constructor(
    private consumerService: ConsumerService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('pending_email');

    if (!this.email) {
      console.error('No pending email found');
      return;
    }

    this.checkStatus();
    this.intervalId = setInterval(() => this.checkStatus(), 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  checkStatus(): void {
    this.consumerService.getPendingStatus(this.email!).subscribe({
      next: (approved) => {
        console.log('Approval status:', approved);

        if (approved === true) {
          localStorage.setItem('approved', 'true');
          localStorage.removeItem('pending_email');

          this.zone.run(() => {
            clearInterval(this.intervalId);
            this.router.navigate(['/']);
          });
        }
      },
      error: (err) => {
        console.error('Polling failed', err);
      }
    });
  }
   options: AnimationOptions = {
    path: 'assets/lottie/pending-approval.json'
  };
}
