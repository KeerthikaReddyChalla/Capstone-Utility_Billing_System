import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUtilityService } from '../../services/admin-utility.service';
import { Tariff } from '../../models/tariff.model';
import { Utility } from '../../models/utility.model';

@Component({
  selector: 'app-tariffs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tariffs.html',
  styleUrl: './tariffs.css'
})
export class TariffsComponent implements OnInit {

  tariffs: Tariff[] = [];
  utilities: Utility[] = [];

  newTariff = {
    utilityId: '',
    name: '',
    ratePerUnit: 0,
    effectiveFrom: ''
  };

  constructor(private service: AdminUtilityService) {}

  ngOnInit(): void {
    this.service.getUtilities().subscribe(u => this.utilities = u);
    this.load();
  }

  load(): void {
    this.service.getTariffs().subscribe(t => this.tariffs = t);
  }

  create(): void {
    this.service.createTariff(this.newTariff).subscribe(() => {
      this.newTariff = { utilityId:'', name:'', ratePerUnit:0, effectiveFrom:'' };
      this.load();
    });
  }

  delete(id: string): void {
    this.service.deleteTariff(id).subscribe(() => this.load());
  }
}
