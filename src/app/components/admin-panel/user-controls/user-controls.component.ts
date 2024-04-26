import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.css']
})
export class UserControlsComponent {

  users:User[];
  userForm:FormGroup;

  @ViewChild('modalCloseBtn') modalCloseBtn!:ElementRef;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private userService:UserService
  )
  {
    this.users = [];
    this.userForm = this.formBuilder.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  getAllUsers():void{
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

  addNewUser():void{ }

  save():void{ }

  submit():void{ }

  get username(){
    return this.userForm.get("username");
  }
  get email(){
    return this.userForm.get("host");
  }
  get password(){
    return this.userForm.get("password");
  }
}
