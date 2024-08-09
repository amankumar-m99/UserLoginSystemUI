import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalDetailsComponent } from './profile-personal-details.component';

describe('ProfilePersonalDetailsComponent', () => {
  let component: ProfilePersonalDetailsComponent;
  let fixture: ComponentFixture<ProfilePersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePersonalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
