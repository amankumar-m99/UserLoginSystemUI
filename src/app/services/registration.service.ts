import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  isEmailInUse(email:string):boolean{
    return false;
  }

  hasEmailBeenInUse(email:string):boolean{
    return false;
  }

  isUsernameAvailable(username:string):boolean{
    return true;
  }
}
