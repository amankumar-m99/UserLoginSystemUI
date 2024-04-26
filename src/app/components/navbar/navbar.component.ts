import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  
  isAdmin:boolean;
  isLoggedIn:boolean;

  @ViewChild('cancelbutton') cancelBtn!:ElementRef;

  constructor(
    private router:Router
  ){
    this.isAdmin = false;
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = Utils.isUserLoggedIn();
    let roleId = Utils.getRoleId();
    if(roleId < 1){
      this.isAdmin = false;
    }
    else if(roleId < 3){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }

  logout():void{
    this.cancelBtn.nativeElement.click();
    Utils.deleteAllCookies();
    this.router.navigate(['/home']);
  }

 }
