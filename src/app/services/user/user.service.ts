import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { User } from 'src/app/model/user/user';
import { JwtResponse } from 'src/app/model/jwt/jwt-response';
import { Utils } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = StaticData.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  getCurrentUser():Observable<User>{
    let url = this.baseUrl + "/user-info/" + Utils.getCookie("userId");
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User>(url, {headers: headers});
  }

  getUserById(userId:number):Observable<User>{
    let url = this.baseUrl + "/user-info/" + userId.toString();
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User>(url, {headers: headers});
  }
  
  getAllUsers():Observable<User[]>{
    let url = this.baseUrl + "/all-users";
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User[]>(url, {headers: headers});
  }
  
  uploadPic(file:File):Observable<String>{
    let headers = Utils.getHeaderWithToken();
    let url = this.baseUrl + "/profile-pic";
    const formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<String>(url, formData, {headers: headers});
  }
}
