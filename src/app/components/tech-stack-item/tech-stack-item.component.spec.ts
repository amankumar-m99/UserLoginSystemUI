import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackItemComponent } from './tech-stack-item.component';

describe('TechStackItemComponent', () => {
  let component: TechStackItemComponent;
  let fixture: ComponentFixture<TechStackItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechStackItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechStackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
