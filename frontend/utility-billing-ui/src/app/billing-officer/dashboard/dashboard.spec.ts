import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDashboardComponent } from './dashboard';

describe('BillingDashboardComponent', () => {
  let component: BillingDashboardComponent;
  let fixture: ComponentFixture<BillingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
