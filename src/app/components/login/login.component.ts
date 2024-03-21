import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.loginForm = this.formBuilder.group({
      username: ['username'],
      password: ['pass']
    });
  }

  submit(){
  }
}