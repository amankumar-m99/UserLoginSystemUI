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

  baseUrl = StaticData.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllRecords():Observable<Smtp[]>{
    let url = this.baseUrl + "/smtp/get-all";
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<Smtp[]>(url, {headers: headers});
  }
  
  saveSmtp(smtp:any):Observable<Smtp>{
    let url = this.baseUrl + "/smtp/add";
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.post<Smtp>(url, smtp, {headers: headers});
  }

}
