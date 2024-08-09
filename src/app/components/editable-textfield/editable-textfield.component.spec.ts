import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextfieldComponent } from './editable-textfield.component';

describe('EditableTextfieldComponent', () => {
  let component: EditableTextfieldComponent;
  let fixture: ComponentFixture<EditableTextfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTextfieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
