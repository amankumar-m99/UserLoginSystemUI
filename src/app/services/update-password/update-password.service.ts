import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {

  constructor(private httpClient: HttpClient) {}

  sendSecurityCodeToUpdatePassword(username:string):Observable<Boolean>{
    let url = StaticData.passwordUpdateUserPostUrl;
    let obj = {"email": username};
    return this.httpClient.post<Boolean>(url, obj);
  }
}
