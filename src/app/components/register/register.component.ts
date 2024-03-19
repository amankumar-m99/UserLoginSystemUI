import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { Utils } from 'src/app/utils/utils';

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
  constructor(private formBuilder:FormBuilder, private registrationService:RegistrationService){
    this.stepIndex=0;
    let accountDetails = formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    this.step = this.steps[0];
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
    let currentForm = this.step['form'] as FormGroup;
    if(!currentForm.valid){
      this.indicateInValidFields(currentForm);
      return;
    }
    if(this.stepIndex == 0){
      if(!this.processStepOne())
        return;
    }
    this.stepIndex++;
    this.step=this.steps[this.stepIndex];
  }

  processStepOne():boolean{
    let currentForm = this.step['form'] as FormGroup;
    let email = currentForm.get("email")?.value;
    let flag = this.registrationService.isEmailInUse(email);
    if(flag){
      alert("Email address is already in use!");
      return false;
    }
    flag = this.registrationService.hasEmailBeenInUse(email);
    if(flag){
      alert("Email address was once in use!");
      return false;
    }
    let username = currentForm.get("username")?.value;
    flag = this.registrationService.isUsernameAvailable(username);
    if(flag){
      alert("username is already taken!");
      return false;
    }
    return true;
  }

  indicateInValidFields(formGroup:FormGroup):void{
    Utils.markAllFieldAsTouched(formGroup);
  }

  sendSecurityCode(){}
  resendSecurityCode(){}

  submit(){
    console.log(this.registrationForm.value);
  }

  get username(){
    return this.registrationForm.get("accountDet")?.get("username");
  }
}
