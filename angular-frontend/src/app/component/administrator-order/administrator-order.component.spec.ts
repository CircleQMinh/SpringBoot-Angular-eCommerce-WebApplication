import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorOrderComponent } from './administrator-order.component';

describe('AdministratorOrderComponent', () => {
  let component: AdministratorOrderComponent;
  let fixture: ComponentFixture<AdministratorOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
