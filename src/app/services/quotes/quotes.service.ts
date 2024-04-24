import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/model/quote/quote';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private httpClient: HttpClient) { }

  getRandomQuote():Observable<Quote>{
    let url = "https://zenquotes.io/api/random";
    return this.httpClient.get<Quote>(url, {headers: new HttpHeaders().set("Access-Control-Allow-Origin", "google.com")});
  }
}
