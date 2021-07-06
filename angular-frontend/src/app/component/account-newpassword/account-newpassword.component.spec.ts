import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewpasswordComponent } from './account-newpassword.component';

describe('AccountNewpasswordComponent', () => {
  let component: AccountNewpasswordComponent;
  let fixture: ComponentFixture<AccountNewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNewpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
