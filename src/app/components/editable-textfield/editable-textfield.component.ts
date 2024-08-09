import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editable-textfield',
  templateUrl: './editable-textfield.component.html',
  styleUrls: ['./editable-textfield.component.css']
})
export class EditableTextfieldComponent {

  @Input() text:string = "";
  isEditable = false;
  tempText:string = "";
  editableStyle = "border:5px solid blue";
  readonlyStyle = "border:none";

  edit(){
    this.tempText = this.text;
    this.isEditable = true;
  }

  save(){
    this.tempText = this.text;
    this.isEditable = false;
  }
  
  discard(){
    this.text = this.tempText;
    this.isEditable = false;
  }
}
