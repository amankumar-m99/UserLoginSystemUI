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

  constructor(
    private router:Router,
    private userService:UserService
  )
  {
    this.users = [];
  }

  ngOnInit(): void {
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

  logout():void{
    Utils.deleteCookie("token");
    Utils.deleteCookie("userId");
    // let router = inject(Router);
    this.router.navigate(['home']);
  }
}
