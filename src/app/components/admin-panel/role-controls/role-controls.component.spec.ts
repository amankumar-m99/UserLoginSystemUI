import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleControlsComponent } from './role-controls.component';

describe('RoleControlsComponent', () => {
  let component: RoleControlsComponent;
  let fixture: ComponentFixture<RoleControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
