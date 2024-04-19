export class UserSecurityDetails {
    constructor(
        public id:number,
        public recoveryEmail:string,
        public recoveryPhoneNumber:string,
        public securityQuestion:string,
        public securityAnswer:string,
        public loginAlert:boolean,
        public passwordUpdateAlert:boolean,
        public twoStepLogin:boolean
    ) { }
}