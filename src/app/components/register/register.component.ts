import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/custom-validators/email-validator';
import { forbiddenNameValidator } from 'src/app/custom-validators/username-validator';
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
      username: ['', [Validators.required, Validators.minLength(2), forbiddenNameValidator(/abc/)]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    let personalDetails = formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      middleName: [''],
      lastName: [''],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      dateOfBirth: ["2024-03-27", [Validators.required]],
    });
    let securityDetails = formBuilder.group({
      recoveryEmail: [''],
      recoveryPhone: [''],
      securityQuestion: [''],
      securityAnswer: [''],
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
        "name":"Security Details",
        "form" : securityDetails
      }
    ]
    this.registrationForm = this.formBuilder.group({
      accountDet : accountDetails,
      personalDet: personalDetails,
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
      // this.processStepOne();
      this.incrementStep();
    }
    else{
      this.incrementStep();
    }
  }

  incrementStep():void{
    this.stepIndex++;
    this.step=this.steps[this.stepIndex];
  }

  processStepOne():void{
    let currentForm = this.step['form'] as FormGroup;
    let email = currentForm.get("email")?.value;
    let username = currentForm.get("username")?.value;
    this.checkEmailInUse(email, username);
  }

  checkEmailInUse(email:string, username:string){
    this.registrationService.isEmailInUse(email).subscribe(response=>{
      if(response == true){
        alert("Email address is already in use!");
      }
      else{
        this.checkEmailHasBeenInUse(email, username);
      }
    }, error=>{
      alert("Error " + error.status + " while enquiring email in use. "+ error.statusText);
    });
  }

  checkEmailHasBeenInUse(email:string, username:string){
    this.registrationService.hasEmailBeenInUse(email).subscribe(response=>{
      if(response == true){
        alert("Email address was once in use.");
      }
      else{
        this.checkUsernameAvailable(username);
      }
    }, error=>{
      alert("Error " + error.status + " while enquiring email has been in use. "+ error.statusText);
    });
  }

  checkUsernameAvailable(username:string){
    this.registrationService.isUsernameAvailable(username).subscribe(response=>{
      if(response == true){
        this.incrementStep();
      }
      else{
        alert("username is not available.");
      }
    }, error=>{
      alert("Error " + error.status + " while enquiring username availability. "+ error.statusText);
      
    });
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

  get email(){
    return this.registrationForm.get("accountDet")?.get("email");
  }

  get password(){
    return this.registrationForm.get("accountDet")?.get("password");
  }
}
