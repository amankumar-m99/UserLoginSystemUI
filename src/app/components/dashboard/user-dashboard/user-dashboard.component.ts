import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  userName = "N/A";
  userId = -1;
  user:User | undefined;

  constructor(private userService:UserService){
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res=>{
      this.user=res;
      this.userName = this.user.username;
      this.userId = this.user.id;
    })
  }
}
