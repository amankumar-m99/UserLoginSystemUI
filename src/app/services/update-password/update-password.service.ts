import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {

  baseUrl = StaticData.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  sendSecurityCodeToUpdatePassword(username:string):Observable<Boolean>{
    let url = this.baseUrl + "/password-update/user";
    let obj = {"email": username};
    return this.httpClient.post<Boolean>(url, obj);
  }
}
