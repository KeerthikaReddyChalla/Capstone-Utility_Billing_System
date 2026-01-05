import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MeterReadingService } from '../services/meter-reading.service';
import { MeterReadingRequest } from '../models/meter-reading-request.model';
import { MeterReadingResponse } from '../models/meter-reading-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meter-readings',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './meter-readings.html',
  styleUrl: './meter-readings.css'
})
export class MeterReadingsComponent implements OnInit {

  readings: MeterReadingResponse[] = [];
  connectionsWithoutReadings: any[] = [];

  loading = false;
  search = '';

  stats = {
    total: 0,
    month: new Date().toLocaleString('default', {
      month: 'short',
      year: 'numeric'
    })
  };

  form: MeterReadingRequest = {
    connectionId: '',
    consumerId: '',
    utilityId: '',
    readingValue: 0,
    readingDate: new Date()
  };

  private apiUrl = environment.apiUrl;

  constructor(
    private service: MeterReadingService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.form.connectionId = params['connectionId'] || '';
      this.form.consumerId   = params['consumerId'] || '';
      this.form.utilityId    = params['utilityId'] || '';
    });
  }

  // ===============================
  // LOAD READINGS
  // ===============================
  loadReadings(): void {
    if (!this.form.connectionId) {
      this.showToast('Enter connection ID', 'error');
      return;
    }

    this.loading = true;

    this.service.getByConnection(this.form.connectionId).subscribe({
      next: (data) => {
        this.readings = data;
        this.calculateStats();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load meter readings', 'error');
      }
    });
  }

  // ===============================
  // CREATE READING
  // ===============================
  createReading(): void {

    if (
      !this.form.connectionId ||
      !this.form.consumerId ||
      !this.form.utilityId ||
      this.form.readingValue <= 0
    ) {
      this.showToast('Please fill all required fields', 'error');
      return;
    }

    this.service.createReading(this.form).subscribe({
      next: (created) => {
        this.readings.unshift(created);
        this.calculateStats();
        this.cdr.detectChanges();

        this.showToast('Meter reading added successfully', 'success');

        this.form.readingValue = 0;
        this.form.readingDate = new Date();
      },
      error: () => {
        this.showToast('Failed to add meter reading', 'error');
      }
    });
  }


  calculateStats(): void {
    this.stats.total = this.readings.length;
  }

  filteredReadings(): MeterReadingResponse[] {
    if (!this.search.trim()) return this.readings;

    const q = this.search.toLowerCase();
    return this.readings.filter(r =>
      r.connectionId.toLowerCase().includes(q)
    );
  }


  loadConnectionsWithoutReadings(): void {

    this.http.get<any[]>(`${this.apiUrl}/connections`).subscribe({
      next: (connections) => {

        const readingConnectionIds =
          this.readings.map(r => r.connectionId);

        this.connectionsWithoutReadings =
          connections.filter(c =>
            !readingConnectionIds.includes(c.id)
          );

        this.cdr.detectChanges();
      },
      error: () => {
        this.showToast('Failed to load connections', 'error');
      }
    });
  }
  /* ---------- TOAST ---------- */
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
  private isApproved(): boolean {
  return localStorage.getItem('approved') === 'true';
}
}
