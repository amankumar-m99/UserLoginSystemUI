export class UserPersonalDetails{
    constructor(
        public id:string,
        public firstName:string,
        public middleName:string,
        public lastName:string,
        public phoneNumber:string,
        public gender:string,
        public country:string,
        public dateOfBirth:Date
    ){ }
}