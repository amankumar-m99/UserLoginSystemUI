import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSecurityDetailsComponent } from './profile-security-details.component';

describe('ProfileSecurityDetailsComponent', () => {
  let component: ProfileSecurityDetailsComponent;
  let fixture: ComponentFixture<ProfileSecurityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSecurityDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSecurityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
