import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  stepIndex:number;
  step:any;
  steps:any[];
  registrationForm:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.stepIndex=0;
    let accountDetails = formBuilder.group({
      username: [''],
      email: [''],
      securityCode: [''],
      password: [''],
      confirmPassword: [''],
    });
    let personalDetails = formBuilder.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      gender: [''],
      country: [''],
      dateOfBirth: [],
    });
    let recoveryDetails = formBuilder.group({
      recoveryEmail: [''],
      recoveryPhone: [''],
      securityQuestion: [''],
      securityAnswer: ['']
    });
    let securityDetails = formBuilder.group({
      loginAlert: [true],
      passwordChangeAlert: [true],
      twoStepLogin: [false],
      promotionalMails: [true],
    });
    this.steps = [
      {
        "name":"Account Details",
        "form" : accountDetails
      },
      {
        "name":"Personal Details",
        "form" : personalDetails
      },
      {
        "name":"Recovery Details",
        "form" : recoveryDetails
      },
      {
        "name":"Security Details",
        "form" : securityDetails
      }
    ]
    this.registrationForm = this.formBuilder.group({
      accountDet : accountDetails,
      personalDet: personalDetails,
      recoveryDet: recoveryDetails,
      securityDet: securityDetails
    });
  }
  previous(){
    if(this.stepIndex == 0){
      return;
    }
    this.stepIndex--;
    this.step=this.steps[this.stepIndex];
  }
  next(){
    if(this.stepIndex >= this.steps.length-1){
      return;
    }
    this.stepIndex++;
    this.step=this.steps[this.stepIndex];
  }

  sendSecurityCode(){}
  resendSecurityCode(){}

  submit(){
    console.log(this.registrationForm.value);
  }
}
