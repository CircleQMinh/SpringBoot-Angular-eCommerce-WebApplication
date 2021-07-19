import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideHomeComponent } from './slide-home.component';

describe('SlideHomeComponent', () => {
  let component: SlideHomeComponent;
  let fixture: ComponentFixture<SlideHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
