import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticData } from '../static/static-data';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  usernameUrl = StaticData.apiBaseUrl+"/register/username-available/";
  emailInUseUrl=StaticData.apiBaseUrl+"/register/email-in-use/";
  emailHasBeenInUseUrl=StaticData.apiBaseUrl+"/register/has-email-been-in-use/";
  registrationUrl = StaticData.apiBaseUrl+"/register/user";

  constructor(private httpClient: HttpClient) { }

  isUsernameAvailable(username:string):Observable<boolean>{
    let url = this.usernameUrl + username;
    return this.httpClient.get<boolean>(url);
  }

  isEmailInUse(email:string):Observable<boolean>{
    let url = this.emailInUseUrl + email;
    return this.httpClient.get<boolean>(url);
  }

  hasEmailBeenInUse(email:string):Observable<boolean>{
    let url = this.emailHasBeenInUseUrl + email;
    return this.httpClient.get<boolean>(url);
  }

  register():Observable<boolean>{
    let url = this.registrationUrl;
    return this.httpClient.get<boolean>(url);
  }

}
