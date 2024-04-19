import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { securityCodeForm } from 'src/app/model/security/security-code-form';

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
