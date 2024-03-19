import { FormGroup } from "@angular/forms";

export class Utils{
    public static markAllFieldAsTouched(formGroup: FormGroup):void{
        Object.keys(formGroup.controls).forEach((key: string)=>{
          const abstractControl = formGroup.get(key);
          // const abstractControl:AbstractControl<any, any> = formGroup.get(key);
          if (abstractControl instanceof FormGroup) {
            Utils.markAllFieldAsTouched(abstractControl);
          } else {
            abstractControl?.markAsTouched();
          }
        });
      }
}