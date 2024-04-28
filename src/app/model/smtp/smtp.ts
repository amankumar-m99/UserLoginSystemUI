export class Smtp{
    constructor(
        public id:number,
        public label:string,
        public username:string,
        public password:string,
        public host:string,
        public port:number,
        public auth:boolean,
        public starttlsEnable:boolean,
        public isSelected:boolean
    ){ }
}