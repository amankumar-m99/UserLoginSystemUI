import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPersonalDetails } from 'src/app/model/user/user-personal-details';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-profile-personal-details',
  templateUrl: './profile-personal-details.component.html',
  styleUrls: ['./profile-personal-details.component.css']
})
export class ProfilePersonalDetailsComponent {

  @Input('personalDetails') personalDetails?:UserPersonalDetails;

  personalDetailsForm:FormGroup;
  isPersonalDetailsEditable = false;
  countries:string[];

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService
    ){
      this.countries = ["India", "Not India"];
      this.personalDetailsForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: [''],
        phoneNumber: [''],
        gender: ['', [Validators.required]],
        country: ['', [Validators.required]],
        dateOfBirth: ["", [Validators.required]]
      });
    }

    setDataInForm(){
      this.personalDetailsForm.setValue({
        firstName: this.personalDetails?.firstName,
        middleName: this.personalDetails?.middleName,
        lastName: this.personalDetails?.lastName,
        phoneNumber: this.personalDetails?.phoneNumber,
        gender: this.personalDetails?.gender,
        country: this.personalDetails?.country,
        dateOfBirth: this.personalDetails?.dateOfBirth
      });
    }
  
  submit():void{
    let userId = Utils.getCookie("userId");
    let data = new UserPersonalDetails(
      userId,
      this.firstName?.value,
      this.middleName?.value,
      this.lastName?.value,
      this.phoneNumber?.value,
      this.gender?.value,
      this.country?.value,
      this.dateOfBirth?.value,
    );
    this.userService.updatePersonalDetails(data).subscribe(res=>{
      this.personalDetails = res;
      this.makeUnEditable();
    }, error =>{
      alert("error"+error);
    });
  }

  validateCountry(){}

  editPersonalDetails():void{
    this.setDataInForm();
    this.makeEditable();
  }
  discardPersonalDetails():void{
    this.makeUnEditable();
  }
  makeEditable():void{
    this.isPersonalDetailsEditable = true;
  }
  makeUnEditable():void{
    this.isPersonalDetailsEditable = false;
  }
  get firstName(){
    return this.personalDetailsForm?.get("firstName");
  }
  get middleName(){
    return this.personalDetailsForm?.get("middleName");
  }
  get lastName(){
    return this.personalDetailsForm?.get("lastName");
  }
  get phoneNumber(){
    return this.personalDetailsForm?.get("phoneNumber");
  }
  get gender(){
    return this.personalDetailsForm?.get("gender");
  }
  get country(){
    return this.personalDetailsForm?.get("country");
  }
  get dateOfBirth(){
    return this.personalDetailsForm?.get("dateOfBirth");
  }

}
