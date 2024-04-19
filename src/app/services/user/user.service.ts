import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { User } from 'src/app/model/user/user';
import { JwtResponse } from 'src/app/model/jwt/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = StaticData.apiBaseUrl+"/user-info/";
  constructor(private httpClient: HttpClient) { }

  getUserInfo(jwtResponse:JwtResponse):Observable<User>{
    let url = this.url + jwtResponse.username;
    let token = "Bearer "+jwtResponse.jwtToken;
    console.log(token);
    let header = new HttpHeaders().set('Authorization', token);
    header = header.set('Content-Type', 'application/json');
    header = header.set('authorization', `${token}`);// Authorization
    console.log(header);
    // return this.httpClient.get<User>(url, {headers: new HttpHeaders({'Authorization': token})});
    return this.httpClient.get<User>(url, {headers: header});
  }
}
