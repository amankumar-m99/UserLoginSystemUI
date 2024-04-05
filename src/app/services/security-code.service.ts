import { Injectable } from '@angular/core';
import { StaticData } from '../static/static-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { securityCodeForm } from '../model/security-code-form';

@Injectable({
  providedIn: 'root'
})
export class SecurityCodeService {

  url = StaticData.apiBaseUrl+"/email/security-code";
  constructor(private httpClient: HttpClient) {
  }
  
  sendSecurityCodeToEmail(email:string):Observable<any>{
    return this.httpClient.post<any>(this.url, new securityCodeForm(email));
  }

}
