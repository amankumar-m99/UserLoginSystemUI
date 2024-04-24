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
  path:string ="";

  constructor(
    private router:Router,
    private userService:UserService
  ){
    this.roleId = -1;
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user=>{
      let roleId = user.roles[0].id;
      for(let role of user.roles){
        if(role.id < roleId)
          roleId = role.id;
      }
      this.roleId = roleId;
    }, error=>{
      alert("Error while navigation to dashboard.")
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

  addNewUser():void{

  }
  getRoleName():string{
    let roleName = this.user?.roles[0].roleName;
    if(roleName === undefined || roleName == null)
      return "N/A";
    return roleName;
  }

  logout():void{
    let proceed:boolean = confirm("You shall be logged out. Continue?");
    if(!proceed)
      return;
    Utils.deleteCookie("token");
    Utils.deleteCookie("userId");
    this.router.navigate(['/home']);
  }
  quoteOfTheDay():void{
  }

  profileClicked():void{
  }

  security():void{
  }
  
  adminConsole():void{
  }

}
