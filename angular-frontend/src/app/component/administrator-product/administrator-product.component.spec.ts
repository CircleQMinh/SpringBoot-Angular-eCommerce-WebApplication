import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorProductComponent } from './administrator-product.component';

describe('AdministratorProductComponent', () => {
  let component: AdministratorProductComponent;
  let fixture: ComponentFixture<AdministratorProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
