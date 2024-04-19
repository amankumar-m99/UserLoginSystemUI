import { Role } from "../role/role";
import { UserPersonalDetails } from "./user-personal-details";
import { UserSecurityDetails } from "./user-security-details";

export class User{
    constructor(
        public id:number,
        public username:string,
        public email:string,
        public password:string,
        public isLocked:boolean,
        public isEnabled:boolean,
        public isAccountExpired:boolean,
        public isCredentialExpired:boolean,
        public roles:Role[],
        public userPersonalDetails:UserPersonalDetails,
        public userSecurityDetails:UserSecurityDetails
    ){}
}