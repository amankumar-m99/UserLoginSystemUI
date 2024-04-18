import { Injectable } from '@angular/core';
import { StaticData } from '../static/static-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = StaticData.apiBaseUrl+"/user-info/";
  constructor(private httpClient: HttpClient) { }

  getUserInfo(username:string):Observable<any>{
    let url = this.url + username;
    return this.httpClient.get<boolean>(url);
  }
}
