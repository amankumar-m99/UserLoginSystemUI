export class JwtResponse{
    constructor(
        public userId:number,
        public userEmail:string,
        public jwtToken:string
    ) { }
}