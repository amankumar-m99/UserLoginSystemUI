export class UpdatePasswordFormModel{
    constructor(
        public email:string,
        public newPassword:string,
        public securityCode:string
    ){}
}