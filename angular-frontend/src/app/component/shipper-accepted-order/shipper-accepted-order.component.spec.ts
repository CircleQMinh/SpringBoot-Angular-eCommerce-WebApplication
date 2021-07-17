import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperAcceptedOrderComponent } from './shipper-accepted-order.component';

describe('ShipperAcceptedOrderComponent', () => {
  let component: ShipperAcceptedOrderComponent;
  let fixture: ComponentFixture<ShipperAcceptedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipperAcceptedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperAcceptedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
