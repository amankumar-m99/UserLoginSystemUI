import { inject } from "@angular/core";
import { Utils } from "./utils"
import { Router } from "@angular/router";

export const ActivateDashBoardRoute = ()=>{
    if(Utils.isUserLoggedIn())
        return true;
    let router = inject(Router);
    router.navigate(['login']);
    return false;
}

export const ActivateLoginAndRegisterRoute = ()=>{
    if(!Utils.isUserLoggedIn())
        return true;
    let router = inject(Router);
    router.navigate(['dashboard']);
    return false;
}

export const ActivateAdminRoute = ()=>{
    let router = inject(Router);
    if(!Utils.isUserLoggedIn()){
        // router.navigate(['dashboard']);
        return false;
    }
    if(Utils.getCookie("userId") === "2" || Utils.getCookie("userId") === "1")
        return true;
    // router.navigate(['dashboard']);
    return false;
}