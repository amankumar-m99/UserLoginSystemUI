import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  user:User | undefined;

  constructor(
    private router:Router,
    private userService:UserService
  ){
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res=>{
      this.user=res;
    });
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

  updatePassword():void{
    alert("Feature not available yet!");
  }

  viewHistory():void{
    alert("Feature not available yet!");
  }
}
