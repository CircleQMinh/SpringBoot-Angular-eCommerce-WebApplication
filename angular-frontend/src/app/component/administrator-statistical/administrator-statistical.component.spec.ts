import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorStatisticalComponent } from './administrator-statistical.component';

describe('AdministratorStatisticalComponent', () => {
  let component: AdministratorStatisticalComponent;
  let fixture: ComponentFixture<AdministratorStatisticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorStatisticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
