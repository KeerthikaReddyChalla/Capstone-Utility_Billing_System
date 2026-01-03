import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsumerService } from '../../services/consumer.service';
import { TokenService } from '../../../core/auth/token.service';
import { Connection } from '../../models/connection.model';

@Component({
  selector: 'app-create-connection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-connection.html',
  styleUrl: './create-connection.css'
})
export class CreateConnectionComponent implements OnInit {

  form = {
    utilityId: '',
    tariffType: ''
  };

  utilities: { id: string; name: string }[] = [];
  connections: Connection[] = [];

  submitted = false;
  loadingConnections = false;

  constructor(
    private consumerService: ConsumerService,
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUtilities();
    this.loadConnections();
  }

  loadUtilities(): void {
    this.consumerService.getUtilities().subscribe({
      next: (data) => {
        this.utilities = data;
      },
      error: () => {
        console.error('Failed to load utilities');
      }
    });
  }

  onUtilitySelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.form.utilityId = select.value;
  }

  submit(): void {
    const consumerId = this.tokenService.getUserId();
    if (!consumerId) return;

    if (!this.form.utilityId || !this.form.tariffType) {
      alert('Please select utility and tariff');
      return;
    }

    const payload = {
      consumerId,
      utilityId: this.form.utilityId,
      tariffType: this.form.tariffType
    };

    this.consumerService.requestConnection(payload).subscribe({
      next: () => {
        this.submitted = true;
        this.form = { utilityId: '', tariffType: '' };
        this.loadConnections();
      },
      error: (err) => {
        alert(err.error?.message || 'Request failed');
      }
    });
  }

  loadConnections(): void {
    const consumerId = this.tokenService.getUserId();
    if (!consumerId) return;

    this.loadingConnections = true;

    this.consumerService.getConnectionsByConsumer(consumerId).subscribe({
      next: (data) => {
        this.connections = data;
        this.loadingConnections = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingConnections = false;
      }
    });
  }
}
