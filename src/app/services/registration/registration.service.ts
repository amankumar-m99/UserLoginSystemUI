import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { StaticData } from 'src/app/static/static-data';
import { UrlUtils } from 'src/app/utils/url-utils';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  registrationUrl = StaticData.registerUserPostUrl;

  constructor(private httpClient: HttpClient) { }

  isUsernameAvailable(username:string):Observable<boolean>{
    let url = UrlUtils.formUrl(StaticData.registerUsernameAvailableGetUrlB, username);
    return this.httpClient.get<boolean>(url);
  }

  isEmailInUse(email:string):Observable<boolean>{
    let url = UrlUtils.formUrl(StaticData.registeEmailInUseGetUrlB, email);
    return this.httpClient.get<boolean>(url);
  }

  hasEmailBeenInUse(email:string):Observable<boolean>{
    let url = UrlUtils.formUrl(StaticData.registerHasEmailBeenInUseGetUrlB, email);
    return this.httpClient.get<boolean>(url);
  }

  register(userModel:any):Observable<User>{
    let url = this.registrationUrl;
    return this.httpClient.post<User>(url, userModel);
  }

}
