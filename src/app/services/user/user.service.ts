import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { User } from 'src/app/model/user/user';
import { Utils } from 'src/app/utils/utils';
import { ProfilePicResponse } from 'src/app/model/profllepicresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = StaticData.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  getCurrentUser():Observable<User>{
    let url = StaticData.useruserInfoGetUrl + Utils.getCookie("userId");
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User>(url, {headers: headers});
  }

  getUserById(userId:number):Observable<User>{
    let url = StaticData.useruserInfoGetUrl + userId.toString();
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User>(url, {headers: headers});
  }
  
  getAllUsers():Observable<User[]>{
    let url = StaticData.userAllGetUrl;
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User[]>(url, {headers: headers});
  }
  
  uploadPic(file:File):Observable<ProfilePicResponse>{
    let headers = Utils.getHeaderWithToken(); //'set('responseType', 'text');
    let url = StaticData.userProfilePicPostUrl;
    const formData = new FormData();
    formData.append("profile-pic", file);
    return this.httpClient.post<ProfilePicResponse>(url, formData, {headers: headers});
  }
}
