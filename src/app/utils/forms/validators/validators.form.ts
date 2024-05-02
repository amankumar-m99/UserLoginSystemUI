import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName: RegExp):ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} | null =>{
        // const forbidden = forbiddenName.test(control.value);
        const forbidden = control.value == "admin";
        return forbidden? {'forbiddenName':{value: control.value}}: null;
    };
}

export function emailValidator():ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} | null =>{
        // let regex = new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/);
        let regex = new RegExp(/\S+@\S+\.\S+/);
        const match = regex.test(control.value);
        return (!match)? {'invalid-regex':{value: control.value}}: null;
    };
}