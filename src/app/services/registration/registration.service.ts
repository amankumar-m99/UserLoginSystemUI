import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { StaticData } from 'src/app/static/static-data';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  usernameUrl = StaticData.registerUsernameAvailableGetUrl;
  emailInUseUrl=StaticData.registeEmailInUseGetUrl;
  emailHasBeenInUseUrl=StaticData.registerHasEmailBeenInUseGetUrl;
  registrationUrl = StaticData.registerUserPostUrl;

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

  register(userModel:any):Observable<User>{
    let url = this.registrationUrl;
    return this.httpClient.post<User>(url, userModel);
  }

}
