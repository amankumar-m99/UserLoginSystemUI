import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/custom-validators/email-validator';
import { forbiddenNameValidator } from 'src/app/custom-validators/username-validator';
import { User } from 'src/app/model/user/user';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormUtils } from 'src/app/utils/forms.util';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.css']
})
export class UserControlsComponent implements OnInit{

  users:User[];
  userForm:FormGroup;
  countries:string[];

  @ViewChild('addNewUserFormModalCloseBtn') modalCloseBtn!:ElementRef;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private registerService:RegistrationService
  )
  {
    this.users = [];
    this.countries = ["India", "Not India"];
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
    this.userForm = this.formBuilder.group({
      accountDet : accountDetails,
      personalDet: personalDetails,
      securityDet: securityDetails
    });
  }

  ngOnInit(): void {
    this.getAllUsers(false);
  }

  getAllUsers(showModal:boolean):void{
    this.userService.getAllUsers().subscribe(response=>{
      if(this.users.length != 0)
        this.users.length = 0;
      response.forEach(r=>{
        this.users.push(r);
      });
    }, error=>{
      alert("Error " + error.statusCode + " occured!");
    });
  }

  submit():void{
    if(!this.userForm.valid){
      FormUtils.markAllFieldAsTouched(this.userForm);
      return;
    }
    this.save();
    this.modalCloseBtn.nativeElement.click();
  }

  save():void{

    // this.registerService.register()
    // this.userService.(this.userForm.value).subscribe(res=>{
    //   alert("Success.");
    //   this.getAllRecords(true);
    // }, error=>{
    //   console.log(error);
    //   alert("error "+error.statusCode);
    // });
  }

  validateCountry(){ }

  get username(){
    return this.userForm.get("accountDet")?.get("username");
  }
  get email(){
    return this.userForm.get("accountDet")?.get("email");
  }
  get password(){
    return this.userForm.get("accountDet")?.get("password");
  }
  get promotionalMails(){
    return this.userForm.get("accountDet")?.get("promotionalMails");
  }

  get firstName(){
    return this.userForm.get("personalDet")?.get("firstName");
  }
  get middleName(){
    return this.userForm.get("personalDet")?.get("middleName");
  }
  get lastName(){
    return this.userForm.get("personalDet")?.get("lastName");
  }
  get gender(){
    return this.userForm.get("personalDet")?.get("gender");
  }
  get country(){
    return this.userForm.get("personalDet")?.get("country");
  }
  get dateOfBirth(){
    return this.userForm.get("personalDet")?.get("dateOfBirth");
  }
}
