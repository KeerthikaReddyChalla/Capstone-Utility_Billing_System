import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillGenerationComponent } from './bill-generation';

describe('BillGenerationComponent', () => {
  let component: BillGenerationComponent;
  let fixture: ComponentFixture<BillGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillGenerationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
