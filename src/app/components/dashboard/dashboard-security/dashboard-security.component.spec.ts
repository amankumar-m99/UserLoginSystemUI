import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSecurityComponent } from './dashboard-security.component';

describe('DashboardSecurityComponent', () => {
  let component: DashboardSecurityComponent;
  let fixture: ComponentFixture<DashboardSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
