import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { securityCodeForm } from 'src/app/model/security/security-code-form';
import { SecurityCodeVerifier } from 'src/app/model/email/security-code-verifier';

@Injectable({
  providedIn: 'root'
})
export class SecurityCodeService {

  url = StaticData.apiBaseUrl+"/email";
  constructor(private httpClient: HttpClient) { }
  
  sendSecurityCodeToEmail(email:string):Observable<any>{
    let url = this.url+"/security-code";
    return this.httpClient.post<any>(url, new securityCodeForm(email));
  }
  
  verifySecurityCode(securityCodeForm:SecurityCodeVerifier){
    let url = this.url+"/security-code";
    return this.httpClient.post<any>(url, securityCodeForm);
  }

}
