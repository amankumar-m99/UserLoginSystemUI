import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSecurityDetails } from 'src/app/model/user/user-security-details';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-profile-security-details',
  templateUrl: './profile-security-details.component.html',
  styleUrls: ['./profile-security-details.component.css']
})
export class ProfileSecurityDetailsComponent {

  @Input('securityDetails') securityDetails?:UserSecurityDetails;

  securityDetailsForm:FormGroup;
  isSecurityDetailsEditable = false;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService
  ){
    this.securityDetailsForm = this.formBuilder.group({
      recoveryEmail: ['', [Validators.required, Validators.minLength(3)]],
      recoveryPhoneNumber: [''],
      securityQuestion: [''],
      securityAnswer: [''],
      loginAlert: [false, [Validators.required]],
      passwordUpdateAlert: [false, [Validators.required]],
      twoStepLogin: [false, [Validators.required]]
    });
  }

  setDataInForm(){
    this.securityDetailsForm.setValue({
      recoveryEmail: this.securityDetails?.recoveryEmail,
      recoveryPhoneNumber: this.securityDetails?.recoveryPhoneNumber,
      securityQuestion: this.securityDetails?.securityQuestion,
      securityAnswer: this.securityDetails?.securityAnswer,
      loginAlert: this.securityDetails?.loginAlert,
      passwordUpdateAlert: this.securityDetails?.passwordUpdateAlert,
      twoStepLogin: this.securityDetails?.twoStepLogin
    });
  }

  submit():void{
    let userId = Utils.getCookie("userId");
    let data = new UserSecurityDetails(
      userId,
      this.recoveryEmail?.value,
      this.recoveryPhoneNumber?.value,
      this.securityQuestion?.value,
      this.securityAnswer?.value,
      this.loginAlert?.value,
      this.passwordUpdateAlert?.value,
      this.twoStepLogin?.value
    );
    
    this.userService.updateSecurityDetails(data).subscribe(res=>{
      this.securityDetails = res;
    }, error =>{
      alert("error"+error);
    });
    this.makeUnEditable();
  }

  editSecurityDetails():void{
    this.setDataInForm();
    this.makeEditable();
  }
  discardSecurityDetails():void{
    this.makeUnEditable();
  }
  makeEditable():void{
    this.isSecurityDetailsEditable = true;
  }
  makeUnEditable():void{
    this.isSecurityDetailsEditable = false;
  }
  get recoveryEmail(){
    return this.securityDetailsForm?.get("recoveryEmail");
  }
  get recoveryPhoneNumber(){
    return this.securityDetailsForm?.get("recoveryPhoneNumber");
  }
  get securityQuestion(){
    return this.securityDetailsForm?.get("securityQuestion");
  }
  get securityAnswer(){
    return this.securityDetailsForm?.get("securityAnswer");
  }
  get loginAlert(){
    return this.securityDetailsForm?.get("loginAlert");
  }
  get passwordUpdateAlert(){
    return this.securityDetailsForm?.get("passwordUpdateAlert");
  }
  get twoStepLogin(){
    return this.securityDetailsForm?.get("twoStepLogin");
  }

}
