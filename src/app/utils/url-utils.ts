export class UrlUtils{
    public static formUrl(url:string, value1:string, ...values:string[]){
		let start = url.indexOf("{");
		let end = url.indexOf("}");
		if(start == -1 || end == -1){
			return url;
		}
		if(value1 == undefined || value1 == null){
			return url;
		}
		url = url.replace(url.substring(start, end+1), value1);
		for(let index in values){
			let start = url.indexOf("{");
			let end = url.indexOf("}");
			if(start == -1 || end == -1){
				return url;
			}
			if(values[index] == undefined || values[index] == null){
				return url;
			}
			url = url.replace(url.substring(start, end+1), values[index]);
		}
		return url;
	}
}