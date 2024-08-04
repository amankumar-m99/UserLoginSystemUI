export class EmailVerificationFormModel {
    constructor(
        public email:string,
        public securityCode:string
    ){}
}