import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userId = -1;
  user!:User;
  constructor(
    private activatedroute:ActivatedRoute,
    private userService:UserService
  )
    {
    let idStr = this.activatedroute.snapshot.paramMap.get("id");
    if(idStr != null){
      this.userId = parseInt(idStr);
    }
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(user=>{
      this.user = user;
    }, error=>{
      alert("Couldn't get user.")
    });
  }
}
