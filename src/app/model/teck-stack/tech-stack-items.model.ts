export class TechStackItemsModel{
    constructor(
        public technology:string,
        public version:string,
        public src:string,
        public width:number=200,
        public height:number=200,
    ){}
}