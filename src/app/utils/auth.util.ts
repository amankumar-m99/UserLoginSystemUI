import { inject } from "@angular/core";
import { Utils } from "./utils"
import { Router } from "@angular/router";

export const authorize = ()=>{
    if(Utils.isUserLoggedIn())
        return true;
    let router = inject(Router);
    router.navigate(['/login']);
    return false;
}