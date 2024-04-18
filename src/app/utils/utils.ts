import { FormGroup } from "@angular/forms";

export class Utils{
    public static markAllFieldAsTouched(formGroup: FormGroup):void{
      Object.keys(formGroup.controls).forEach((key: string)=>{
        const abstractControl = formGroup.get(key);
        if (abstractControl instanceof FormGroup) {
          // const abstractControl:AbstractControl<any, any> = formGroup.get(key);
          Utils.markAllFieldAsTouched(abstractControl);
        } else {
          abstractControl?.markAsTouched();
        }
      });
    }
    
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
    
    // public static checkCookie() {
    //   let user = getCookie("username");
    //   if (user != "") {
    //     alert("Welcome again " + user);
    //   } else {
    //     user = prompt("Please enter your name:", "");
    //     if (user != "" && user != null) {
    //       setCookie("username", user, 365);
    //     }
    //   }
    // }
}