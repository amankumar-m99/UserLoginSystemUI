import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { User } from 'src/app/model/user/user';
import { Utils } from 'src/app/utils/utils';
import { ProfilePicResponse } from 'src/app/model/profllepicresponse';
import { UrlUtils } from 'src/app/utils/url-utils';
import { UserPersonalDetails } from 'src/app/model/user/user-personal-details';
import { UserSecurityDetails } from 'src/app/model/user/user-security-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getCurrentUser():Observable<User>{
    let url = UrlUtils.formUrl(StaticData.useruserInfoGetUrlB, Utils.getCookie("userId"));
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<User>(url, {headers: headers});
  }

  getUserById(userId:number):Observable<User>{
    let url = UrlUtils.formUrl(StaticData.useruserInfoGetUrlB, userId.toString());
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

  updatePersonalDetails(personalDetails: UserPersonalDetails):Observable<UserPersonalDetails>{
    let url = StaticData.userUpdatePersonalDetailsPostUrl;
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.post<UserPersonalDetails>(url, personalDetails, {headers: headers});
  }

  updateSecurityDetails(securityDetails: UserSecurityDetails):Observable<UserSecurityDetails>{
    let url = StaticData.userUpdateSecurityDetailsPostUrl;
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.post<UserSecurityDetails>(url, securityDetails, {headers: headers});
  }
}
