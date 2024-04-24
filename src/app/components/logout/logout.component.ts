import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(
    private router:Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout():void{
    let proceed:boolean = confirm("You shall be logged out. Continue?");
    if(!proceed){
      this.location.back();
      return;
    }
    Utils.deleteCookie("token");
    Utils.deleteCookie("userId");
    this.router.navigate(['/home']);
  }

}
