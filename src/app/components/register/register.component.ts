import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationFormModel } from 'src/app/model/registration/registration-form-model';
import { EmailVerificationFormModel } from 'src/app/model/user/email-verification-form.model';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { SecurityCodeService } from 'src/app/services/security-code/security-code.service';
import { FormUtils } from 'src/app/utils/forms.util';
import { emailValidator, forbiddenNameValidator } from 'src/app/utils/forms/validators/validators.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  stepIndex:number;
  step:any;
  steps:any[];
  isForm2:boolean;
  registrationForm:FormGroup;
  securityCodeForm:FormGroup;
  countries:string[];
  isRequestInProgress:boolean;

  constructor(
    private formBuilder:FormBuilder,
    private registrationService:RegistrationService,
    private securityCodeService:SecurityCodeService,
    private router:Router
    ){
      this.countries = [];
      this.isForm2 = false;
      this.stepIndex=0;
      this.isRequestInProgress = false;
      this.securityCodeForm = this.formBuilder.group({
        securityCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
      });
      let accountDetails = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(2), forbiddenNameValidator(/abc/)]],
        email: ['', [Validators.required, emailValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
      let personalDetails = formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: [''],
        phoneNumber: [''],
        gender: ['', [Validators.required]],
        country: ['', [Validators.required]],
        dateOfBirth: ["", [Validators.required]]
      });
      let securityDetails = formBuilder.group({
        recoveryEmail: [''],
        recoveryPhone: [''],
        securityQuestion: [''],
        securityAnswer: [''],
        loginAlert: [true],
        passwordUpdateAlert: [true],
        twoStepLogin: [false]
      });
      this.steps = [
        {
          "name":"Account Details",
          "form" : accountDetails
        },
        {
          "name":"Personal Details",
          "form" : personalDetails
        }
      ];
      this.registrationForm = this.formBuilder.group({
        accountDet : accountDetails,
        personalDet: personalDetails
      });
      this.step = this.steps[0];
  }

  ngOnInit(): void {
    this.countries = ["India", "Not India"];
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
      this.processStepOne();
    }
    else{
      this.incrementStep();
    }
  }

  incrementStep():void{
    this.stepIndex++;
    this.step=this.steps[this.stepIndex];
  }

  validateCountry(){}

  processStepOne():void{
    let currentForm = this.step['form'] as FormGroup;
    let email = currentForm.get("email")?.value;
    let username = currentForm.get("username")?.value;
    this.checkEmailInUse(email, username);
  }

  checkEmailInUse(email:string, username:string){
    this.isRequestInProgress = true;
    this.registrationService.isEmailInUse(email).subscribe({
      next: (response)=>{
        this.isRequestInProgress = false;
        if(response == true){
          alert("Email address is already in use!");
        }
        else{
          this.checkEmailHasBeenInUse(email, username);
        }
      },
      error: (error)=>{
        this.isRequestInProgress = false;
        alert("Error " + error.status + " while enquiring email in use. "+ error.statusText);
      },
      complete: ()=>{}
    });
  }

  checkEmailHasBeenInUse(email:string, username:string){
    this.registrationService.hasEmailBeenInUse(email).subscribe({
      next: (response)=>{
        if(response == true){
          alert("Email address was once in use.");
        }
        else{
          this.checkUsernameAvailable(username);
        }
      },
      error: (error)=>{
        alert("Error " + error.status + " while enquiring email has been in use. "+ error.statusText);
      },
      complete: ()=>{}
    });
  }

  checkUsernameAvailable(username:string){
    this.registrationService.isUsernameAvailable(username).subscribe({
      next: (response)=>{
        if(response == true){
          this.incrementStep();
        }
        else{
          alert("username is not available.");
        }
      },
      error: (error)=>{
        alert("Error " + error.status + " while enquiring username availability. "+ error.statusText);
      },
      complete: ()=>{}
    });
  }

  sendSecurityCode(email:string){
    this.securityCodeService.sendSecurityCodeToEmail(email).subscribe({
      next: (response)=>{
        this.isForm2=true;
      },
      error: (error)=>{
        alert("could not sent security code to "+ email)
      },
      complete: ()=>{}
    });
  }

  resendSecurityCode(){}

  submit(){
    this.sendSecurityCode(this.email?.value);
  }

  submitSecurityCode(){
    if(!this.securityCodeForm.valid){
      this.indicateInValidFields(this.securityCodeForm);
      return;
    }
    let data = new EmailVerificationFormModel(this.email?.value, this.securityCode?.value);
    this.securityCodeService.verifySecurityCode(data).subscribe({
      next: (response)=>{
        if(response){
          let userReg = this.getRegistrationFormModel();
          this.registrationService.register(userReg).subscribe({
            next: (response)=>{
              this.router.navigate(['login', this.email?.value]);
              alert('user registered. Proceed to login page.');
            },
            error: (error)=>{
              console.log(error);
              alert("Error while registering user.");
            }
          });
        }
        else{
          alert("wrong security code");
        }
      },
      error:(error)=>{}
    });
  }

  getRegistrationFormModel():RegistrationFormModel{
    let registrationFormModel = new RegistrationFormModel();
    registrationFormModel.accountDetails.username = this.username?.value;
    registrationFormModel.accountDetails.email = this.email?.value;
    registrationFormModel.accountDetails.password = this.password?.value;
    registrationFormModel.accountDetails.roles.push(3);

    registrationFormModel.personalDetails.firstName = this.firstName?.value;
    registrationFormModel.personalDetails.middleName = this.middleName?.value;
    registrationFormModel.personalDetails.lastName = this.lastName?.value;
    registrationFormModel.personalDetails.phoneNUmber = this.phoneNumber?.value;
    registrationFormModel.personalDetails.gender = this.gender?.value;
    registrationFormModel.personalDetails.country = this.country?.value;
    registrationFormModel.personalDetails.dateOfBirth = this.dateOfBirth?.value;

    registrationFormModel.securityDetails.recoveryEmail = this.recoveryEmail?.value;
    registrationFormModel.securityDetails.recoveryPhone = this.recoveryPhone?.value;
    registrationFormModel.securityDetails.securityQuestion = this.securityQuestion?.value;
    registrationFormModel.securityDetails.securityAnswer = this.securityAnswer?.value;
    registrationFormModel.securityDetails.loginAlert = this.loginAlert?.value;
    registrationFormModel.securityDetails.passwordUpdateAlert = this.passwordUpdateAlert?.value;
    registrationFormModel.securityDetails.twoStepLogin = this.twoStepLogin?.value;
    return registrationFormModel;
  }

  indicateInValidFields(formGroup:FormGroup):void{
    FormUtils.markAllFieldAsTouched(formGroup);
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

  get firstName(){
    return this.registrationForm.get("personalDet")?.get("firstName");
  }
  get middleName(){
    return this.registrationForm.get("personalDet")?.get("middleName");
  }
  get lastName(){
    return this.registrationForm.get("personalDet")?.get("lastName");
  }
  get phoneNumber(){
    return this.registrationForm.get("personalDet")?.get("phoneNumber");
  }
  get gender(){
    return this.registrationForm.get("personalDet")?.get("gender");
  }
  get country(){
    return this.registrationForm.get("personalDet")?.get("country");
  }
  get dateOfBirth(){
    return this.registrationForm.get("personalDet")?.get("dateOfBirth");
  }

  get recoveryEmail(){
    return this.registrationForm.get("securityDet")?.get("recoveryEmail");
  }
  get recoveryPhone(){
    return this.registrationForm.get("securityDet")?.get("recoveryEmail");
  }
  get securityQuestion(){
    return this.registrationForm.get("securityDet")?.get("securityQuestion");
  }
  get securityAnswer(){
    return this.registrationForm.get("securityDet")?.get("securityAnswer");
  }
  get loginAlert(){
    return this.registrationForm.get("securityDet")?.get("loginAlert");
  }
  get passwordUpdateAlert(){
    return this.registrationForm.get("securityDet")?.get("passwordUpdateAlert");
  }
  get twoStepLogin(){
    return this.registrationForm.get("securityDet")?.get("twoStepLogin");
  }
  get securityCode(){
    return this.securityCodeForm.get("securityCode");
  }
}
