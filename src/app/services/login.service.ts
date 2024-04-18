import { Injectable } from '@angular/core';
import { StaticData } from '../static/static-data';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../model/login-form-model';
import { Observable } from 'rxjs';
import { JwtResponse } from '../model/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = StaticData.apiBaseUrl+"/login";

  constructor(private httpClient: HttpClient) { }

  login(loginFormModel:LoginFormModel):Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(this.loginUrl, loginFormModel);
  }
}
