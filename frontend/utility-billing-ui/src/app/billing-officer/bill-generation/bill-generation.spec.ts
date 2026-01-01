import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillGeneration } from './bill-generation';

describe('BillGeneration', () => {
  let component: BillGeneration;
  let fixture: ComponentFixture<BillGeneration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillGeneration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillGeneration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
