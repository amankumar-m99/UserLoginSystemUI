import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role/role';
import { StaticData } from 'src/app/static/static-data';
import { Utils } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = StaticData.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllRecords():Observable<Role[]>{
    let url = this.baseUrl + "/role/all-roles";
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.get<Role[]>(url, {headers: headers});
  }

  saveRole(smtp:any):Observable<Role>{
    let url = this.baseUrl + "/role/create";
    let headers = Utils.getHeaderWithToken();
    return this.httpClient.post<Role>(url, smtp, {headers: headers});
  }

}
