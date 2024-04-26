import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpControlsComponent } from './smtp-controls.component';

describe('SmtpControlsComponent', () => {
  let component: SmtpControlsComponent;
  let fixture: ComponentFixture<SmtpControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmtpControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmtpControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
