import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperOrderHistoryComponent } from './shipper-order-history.component';

describe('ShipperOrderHistoryComponent', () => {
  let component: ShipperOrderHistoryComponent;
  let fixture: ComponentFixture<ShipperOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipperOrderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
