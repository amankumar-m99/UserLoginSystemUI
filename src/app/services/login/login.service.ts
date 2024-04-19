import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { JwtResponse } from 'src/app/model/jwt/jwt-response';
import { LoginFormModel } from 'src/app/model/login/login-form-model';

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
