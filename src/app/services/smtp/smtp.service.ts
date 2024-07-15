import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Smtp } from 'src/app/model/smtp/smtp';
import { StaticData } from 'src/app/static/static-data';
import { Utils } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SmtpService {


  constructor(private httpClient: HttpClient) { }

  getAllRecords():Observable<Smtp[]>{
    let url = StaticData.smtpGetAllGetUrl;
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<Smtp[]>(url, {headers: headers});
  }
  
  saveSmtp(smtp:any):Observable<Smtp>{
    let url = StaticData.smtpAddPostUrl;
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.post<Smtp>(url, smtp, {headers: headers});
  }

  markSelected(smtp:Smtp):Observable<any>{
    let url = StaticData.smtpMarkSelectedPutUrl + "/smtp/mark-selected";
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.put<any>(url, smtp, {headers: headers});
  }

}
