import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  usernameUrl = "http://localhost:8080/register/username-available/";
  emailInUseUrl="http://localhost:8080/register/email-in-use/";
  emailHasBeenInUseUrl="http://localhost:8080/register/has-email-been-in-use/";
  registrationUrl = "http://localhost:8080/register/user";

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
