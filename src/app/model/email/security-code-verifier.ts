export class SecurityCodeVerifier{
    constructor(
        public email:string,
        public securityCode:number,
        public purpose:number
    ){ }
}