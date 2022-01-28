import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashedOutComponent } from './cashed-out.component';

describe('CashedOutComponent', () => {
  let component: CashedOutComponent;
  let fixture: ComponentFixture<CashedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashedOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
