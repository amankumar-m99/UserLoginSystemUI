import { Component } from '@angular/core';
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

  constructor(
    private router:Router,
    private userService:UserService
  )
  {
    this.users = [];
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
}