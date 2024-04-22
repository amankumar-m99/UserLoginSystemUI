import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    if(Utils.isUserLoggedIn()){
      this.router.navigate(["dashboard"]);
    }
  }

  login():void{
    this.router.navigate(["login"]);
  }

  register():void{
    this.router.navigate(["register"]);
  }
}
