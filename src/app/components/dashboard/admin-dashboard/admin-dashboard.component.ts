import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  users: User[];
  user: User | undefined;
  path:string="quote"

  constructor(
    private router:Router,
    private userService:UserService
  )
  {
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res=>{
      this.user=res;
    })
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
    this.path = "quote";
  }

  profileClicked():void{
    this.path = "profile";
  }

  viewHistory():void{
    this.path = "history";
  }
  
  adminConsole():void{
    this.path = "admin";
  }
}
