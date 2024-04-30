import { FormGroup } from "@angular/forms";
import { JwtResponse } from "../model/jwt/jwt-response";
import { HttpHeaders } from "@angular/common/http";

export class Utils{

    public static setCookie(cname:string, cvalue:string) {
      const d = new Date();
      d.setTime(d.getTime() + (0.25 * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    public static getCookie(cname:string) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    public static hasCookie(cookie:string):boolean {
      let result = this.getCookie(cookie);
      if(result === undefined || result == null){
        return false;
      }
      return true;
    }
  
    public static deleteCookie(cookie:string):void {
      document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  
    public static deleteAllCookies():void {
      this.deleteCookie("userId");
      this.deleteCookie("token");
      this.deleteCookie("roleId");
    }
  
    public static getJwtToken():string{
      return this.getCookie("token");
    }
  
    public static getJwtResponse():JwtResponse{
      let userId = parseInt(this.getCookie("userId"));
      return new JwtResponse(this.getCookie("token"), userId);
    }
  
    public static getHeaderWithToken():HttpHeaders{
      let token = this.getJwtToken();
      let auth = "Bearer " + token;
      let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', auth);
      return header;
    }
  
    public static isUserLoggedIn():boolean{
      let token = this.getCookie("token");
      if(token === undefined || token == null || token.length == 0){
        return false;
      }
      return true;
    }
  
    public static getRoleId():number{
      let cookie = this.getCookie("roleId");
      if(cookie === undefined || cookie == null || cookie.length == 0){
        return -1;
      }
      return parseInt(cookie);
    }
  
    public static setRoleId(roleId:string):void{
      this.setCookie("roleId", roleId);
      let cookie = this.getCookie("roleId");
    }
    
}