import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/custom-validators/email-validator';
import { forbiddenNameValidator } from 'src/app/custom-validators/username-validator';
import { RegistrationFormModel } from 'src/app/model/registration/registration-form-model';
import { User } from 'src/app/model/user/user';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { SecurityCodeService } from 'src/app/services/security-code/security-code.service';
import { Utils } from 'src/app/utils/utils';

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
  constructor(private formBuilder:FormBuilder,
    private registrationService:RegistrationService,
    private securityCodeService:SecurityCodeService
    ){
      this.countries = [];
      this.isForm2 = false;
      this.stepIndex=0;
      this.securityCodeForm = this.formBuilder.group({
        securityCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
      });
      let accountDetails = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(2), forbiddenNameValidator(/abc/)]],
        email: ['', [Validators.required, emailValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        promotionalMails: [true],
      });
      let personalDetails = formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: [''],
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
        passwordChangeAlert: [true],
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
      ]
      this.registrationForm = this.formBuilder.group({
        accountDet : accountDetails,
        personalDet: personalDetails,
        securityDet: securityDetails
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

  sendSecurityCode(email:string){
    alert("sending security code to "+ email);
    this.securityCodeService.sendSecurityCodeToEmail(email).subscribe(res=>{
      alert("sent security code to "+ email)
    }, error=>{
      alert("could not sent security code to "+ email)
    });
  }

  resendSecurityCode(){}

  submit(){
    let registrationFormModel = new RegistrationFormModel();
    registrationFormModel.accountDetails.username = this.username?.value;
    registrationFormModel.accountDetails.email = this.email?.value;
    registrationFormModel.accountDetails.password = this.password?.value;
    registrationFormModel.accountDetails.promotionalMails = this.promotionalMails?.value;

    registrationFormModel.personalDetails.firstName = this.firstName?.value;
    registrationFormModel.personalDetails.middleName = this.middleName?.value;
    registrationFormModel.personalDetails.lastName = this.lastName?.value;
    registrationFormModel.personalDetails.gender = this.gender?.value;
    registrationFormModel.personalDetails.country = this.country?.value;
    registrationFormModel.personalDetails.dateOfBirth = this.dateOfBirth?.value;

    registrationFormModel.securityDetails.recoveryEmail = this.recoveryEmail?.value;
    registrationFormModel.securityDetails.recoveryPhone = this.recoveryPhone?.value;
    registrationFormModel.securityDetails.sequrityQuestion = this.sequrityQuestion?.value;
    registrationFormModel.securityDetails.sequrityAnswer = this.sequrityAnswer?.value;
    registrationFormModel.securityDetails.loginAlert = this.loginAlert?.value;
    registrationFormModel.securityDetails.passwordChangeAlert = this.passwordChangeAlert?.value;
    registrationFormModel.securityDetails.twoStepLogin = this.twoStepLogin?.value;
    this.sendSecurityCode(this.email?.value);
    this.isForm2=true;
  }

  submitSecurityCode(){
    if(!this.securityCodeForm.valid){
      this.indicateInValidFields(this.securityCodeForm);
      return;
    }
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
  get promotionalMails(){
    return this.registrationForm.get("accountDet")?.get("promotionalMails");
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
  get sequrityQuestion(){
    return this.registrationForm.get("securityDet")?.get("sequrityQuestion");
  }
  get sequrityAnswer(){
    return this.registrationForm.get("securityDet")?.get("sequrityAnswer");
  }
  get loginAlert(){
    return this.registrationForm.get("securityDet")?.get("loginAlert");
  }
  get passwordChangeAlert(){
    return this.registrationForm.get("securityDet")?.get("passwordChangeAlert");
  }
  get twoStepLogin(){
    return this.registrationForm.get("securityDet")?.get("twoStepLogin");
  }
  get securityCode(){
    return this.securityCodeForm.get("securityCode");
  }
}
