import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorUserComponent } from './administrator-user.component';

describe('AdministratorUserComponent', () => {
  let component: AdministratorUserComponent;
  let fixture: ComponentFixture<AdministratorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
