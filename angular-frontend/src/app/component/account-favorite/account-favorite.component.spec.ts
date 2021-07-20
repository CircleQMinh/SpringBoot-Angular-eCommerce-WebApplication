import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFavoriteComponent } from './account-favorite.component';

describe('AccountFavoriteComponent', () => {
  let component: AccountFavoriteComponent;
  let fixture: ComponentFixture<AccountFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
