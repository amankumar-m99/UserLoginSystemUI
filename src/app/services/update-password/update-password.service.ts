import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailFormModel } from 'src/app/model/email/email-form.model';
import { UpdatePasswordFormModel } from 'src/app/model/user/update-password-form.model';
import { StaticData } from 'src/app/static/static-data';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {

  constructor(private httpClient: HttpClient) {}

  sendSecurityCodeToUpdatePassword(data: EmailFormModel):Observable<Boolean>{
    let url = StaticData.passwordUpdateSendSecurityCodePostUrl;
    return this.httpClient.post<Boolean>(url, data);
  }

  updatePassword(data: UpdatePasswordFormModel):Observable<Boolean>{
    let url = StaticData.passwordUpdateUpdatePostUrl;
    return this.httpClient.post<Boolean>(url, data);
  }
}
