import { FormGroup } from "@angular/forms";

export class FormUtils{

    public static markAllFieldAsTouched(formGroup: FormGroup):void{
        Object.keys(formGroup.controls).forEach((key: string)=>{
          const abstractControl = formGroup.get(key);
          if (abstractControl instanceof FormGroup) {
            // const abstractControl:AbstractControl<any, any> = formGroup.get(key);
            FormUtils.markAllFieldAsTouched(abstractControl);
          } else {
            abstractControl?.markAsTouched();
          }
        });
      }
}