import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePasswordFormModel } from 'src/app/model/user/update-password-form.model';
import { UpdatePasswordService } from 'src/app/services/update-password/update-password.service';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.css']
})
export class UpdatePasswordFormComponent {
  updatePasswordForm:FormGroup;
  isSecurityCodeSent:boolean;
  @Input()
  username = "username";
  securityCode = 123456;
  securityCodePurpose = "";

  constructor(
    private formBuilder:FormBuilder,
    private updatePasswordService:UpdatePasswordService,
    private router:Router,
    private activatedroute:ActivatedRoute
  ){
    this.isSecurityCodeSent = true;
    let emailId:string | null = "";
    if(this.activatedroute.snapshot.paramMap?.has("emailId")){
      emailId = this.activatedroute.snapshot.paramMap.get("emailId");
    }
    this.updatePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      againPassword: ['', Validators.required],
      securityCode: ['', Validators.required]
    });
  }

  submitUpdatePassword():void{
    let securityCode = this.updatePasswordForm.get('securityCode')?.value;
    let newPassword = this.updatePasswordForm.get('newPassword')?.value;
    let updatePasswwordModel = new UpdatePasswordFormModel(this.username, newPassword, securityCode);
    this.updatePasswordService.updatePassword(updatePasswwordModel).subscribe({
      next: (response)=>{
        if(response){
          alert("Success");
          this.router.navigate(['login']);
        }
      },
      error: (error)=>{
        alert("error "+error.statusCode);
      },
      complete: ()=>{}
    });
  }
}
