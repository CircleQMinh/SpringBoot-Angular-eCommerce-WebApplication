import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderlistComponent } from './account-orderlist.component';

describe('AccountOrderlistComponent', () => {
  let component: AccountOrderlistComponent;
  let fixture: ComponentFixture<AccountOrderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrderlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
