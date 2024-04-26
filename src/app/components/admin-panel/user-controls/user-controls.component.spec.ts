import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlsComponent } from './user-controls.component';

describe('UserControlsComponent', () => {
  let component: UserControlsComponent;
  let fixture: ComponentFixture<UserControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
