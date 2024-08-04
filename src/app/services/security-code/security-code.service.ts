import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from 'src/app/static/static-data';
import { securityCodeForm } from 'src/app/model/security/security-code-form';
import { EmailVerificationFormModel } from 'src/app/model/user/email-verification-form.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityCodeService {

  constructor(private httpClient: HttpClient) { }
  
  sendSecurityCodeToEmail(email:string):Observable<any>{
    let url = StaticData.emailSecurityCodePostUrl;
    return this.httpClient.post<any>(url, new securityCodeForm(email));
  }
  
  verifySecurityCode(securityCodeForm:EmailVerificationFormModel):Observable<boolean>{
    let url = StaticData.emailVerifyPostUrl;
    return this.httpClient.post<boolean>(url, securityCodeForm);
  }

}
