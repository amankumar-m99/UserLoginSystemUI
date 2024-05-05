import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  roleId: number;
  users: User[];
  user: User | undefined;

  constructor(
    private router:Router,
    private userService:UserService
  ){
    this.roleId = -1;
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (response)=>{
        let roleId = response.roles[0].id;
        for(let role of response.roles){
          if(role.id < roleId)
            roleId = role.id;
        }
        this.roleId = roleId;
        Utils.setRoleId(this.roleId.toString());
      },
      error: (error)=>{
        alert("Error while navigation to dashboard.")
      },
      complete: ()=>{}
    });
  }

  getAllUsers():void{
    this.userService.getAllUsers().subscribe({
      next: (response)=>{
        if(this.users.length != 0)
          this.users.length = 0;
        response.forEach(r=>{
          this.users.push(r);
        });
      },
      error: (error)=>{
        alert("Error " + error.statusCode + " occured!");
      },
      complete: ()=>{}
    });
  }

  addNewUser():void{

  }
  getRoleName():string{
    let roleName = this.user?.roles[0].roleName;
    if(roleName === undefined || roleName == null)
      return "N/A";
    return roleName;
  }

  
}
