import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUtilityService } from '../../services/admin-utility.service';
import { Utility } from '../../models/utility.model';

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilities.html',
  styleUrl: './utilities.css'
})
export class UtilitiesComponent implements OnInit {

  utilities: Utility[] = [];
  newUtility = { name: '', description: '' };

  constructor(private service: AdminUtilityService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getUtilities().subscribe(u => this.utilities = u);
  }

  create(): void {
    this.service.createUtility(this.newUtility).subscribe(() => {
      this.newUtility = { name: '', description: '' };
      this.load();
    });
  }

  delete(id: string): void {
    this.service.deleteUtility(id).subscribe(() => this.load());
  }
}
