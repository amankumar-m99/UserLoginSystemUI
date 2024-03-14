import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step:number;
  stepName:string;
  accountDetails:FormGroup;
  personalDetails:FormGroup;
  securityDetails:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.step=1;
    this.stepName = "AccountDetails";
    this.accountDetails = formBuilder.group({
      username: [''],
      email: [''],
      securityCode: [''],
      password: [''],
      confirmPassword: [''],
    });
    this.personalDetails = formBuilder.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      gender: [''],
      country: [''],
      dateOfBirth: [''],
    });
    this.securityDetails = formBuilder.group({
      loginAlert: [''],
      passwordChangeAlert: [''],
      twoStepLogin: [''],
      promotionalMails: [''],
    });
  }
  previous(){}
  next(){
    this.step++;
    console.log(this.step);
  }
  submit(){}
}
