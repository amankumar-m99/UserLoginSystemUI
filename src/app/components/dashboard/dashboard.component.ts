import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse } from 'src/app/model/jwt/jwt-response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  roleId=-1;
  constructor(
    private userService:UserService
  ){ }

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

}
