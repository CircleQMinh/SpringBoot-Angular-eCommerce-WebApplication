import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderinfoComponent } from './account-orderinfo.component';

describe('AccountOrderinfoComponent', () => {
  let component: AccountOrderinfoComponent;
  let fixture: ComponentFixture<AccountOrderinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrderinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
