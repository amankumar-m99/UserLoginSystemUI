import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard-security',
  templateUrl: './dashboard-security.component.html',
  styleUrls: ['./dashboard-security.component.css']
})
export class DashboardSecurityComponent implements OnInit{
  user!:User;

  constructor(
    private router:Router,
    private userService:UserService
  ){ }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (response)=>{
        this.user = response;
      },
      error: (error)=>{
        alert("error while fetching data for security");
      },
      complete: ()=>{}
    });
  }

}
