import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MeterReadingService } from '../services/meter-reading.service';
import { MeterReadingRequest } from '../models/meter-reading-request.model';
import { MeterReadingResponse } from '../models/meter-reading-response.model';

@Component({
  selector: 'app-meter-readings',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './meter-readings.html',
  styleUrl: './meter-readings.css'
})
export class MeterReadingsComponent implements OnInit {

  readings: MeterReadingResponse[] = [];
  loading = false;

  stats = {
    total: 0,
    pending: 0,
    verified: 0,
    month: new Date().toLocaleString('default', { month: 'short', year: 'numeric' })
  };

  search = '';

  form: MeterReadingRequest = {
    connectionId: '',
    currentReading: 0,
    readingDate: new Date().toISOString()
  };

  constructor(
    private service: MeterReadingService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  loadReadings(): void {
    if (!this.form.connectionId) return;

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
        this.snackBar.open('Failed to load readings', 'Close', { duration: 3000 });
      }
    });
  }

  createReading(): void {
    this.service.createReading(this.form).subscribe({
      next: (created) => {
        this.readings.unshift(created);
        this.calculateStats();
        this.cdr.detectChanges();

        this.snackBar.open('Meter reading added', 'OK', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to add reading', 'Close', { duration: 3000 });
      }
    });
  }

  calculateStats(): void {
    this.stats.total = this.readings.length;
    this.stats.pending = this.readings.filter(r => r.status === 'PENDING').length;
    this.stats.verified = this.readings.filter(r => r.status === 'VERIFIED').length;
  }

  filteredReadings(): MeterReadingResponse[] {
    return this.readings.filter(r =>
      r.consumerName.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
