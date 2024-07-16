import { Conditional } from "@angular/compiler";

export class UrlUtils{
    public static formUrl(url:string, ...fillers:string[]):string{
        let start = url.indexOf("{");
        let end = url.indexOf("}");
        let sub = url.substring(start, end+1);
        let res = url.replace(sub, fillers[0]);
        return res;
    }
}