import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  isEmailInUse(email:string):boolean{
    return true;
  }

  hasEmailBeenInUse(email:string):boolean{
    return true;
  }

  isUsernameAvailable(username:string):boolean{
    return false;
  }
}
