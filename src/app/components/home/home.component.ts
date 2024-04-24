import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'src/app/model/quote/quote';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // quote!:Quote;

  constructor(
    private router:Router,
    private quoteService:QuotesService
  ){}

  ngOnInit(): void {
    if(Utils.isUserLoggedIn()){
      this.router.navigate(["dashboard"]);
    }
    // else{
    //   this.quoteService.getRandomQuote().subscribe(res=>{
    //     this.quote = res;
    //   })
    // }
  }

  login():void{
    this.router.navigate(["login"]);
  }

  register():void{
    this.router.navigate(["register"]);
  }
}
