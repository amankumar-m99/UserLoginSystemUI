import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { EmailFormModel } from 'src/app/model/email/email-form.model';
import { UpdatePasswordService } from 'src/app/services/update-password/update-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm:FormGroup;
  fillSecurityCodeForm:FormGroup;
  isSecurityCodeSent:boolean;
  username = "sample@Username";

  constructor(
    private formBuilder:FormBuilder,
    private updatePasswordService:UpdatePasswordService,
    private activatedroute:ActivatedRoute
  ){
    this.isSecurityCodeSent = false;
    let emailId:string | null = "";
    if(this.activatedroute.snapshot.paramMap?.has("emailId")){
      emailId = this.activatedroute.snapshot.paramMap.get("emailId");
    }
    this.forgotPasswordForm = this.formBuilder.group({
      username: [emailId, Validators.required],
    });
    this.fillSecurityCodeForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      againPassword: ['', Validators.required],
      securityCode: ['', Validators.required]
    });
  }

  submitEmail():void{
    this.username = this.forgotPasswordForm.get('username')?.value;
    let data = new EmailFormModel(this.username);
    this.updatePasswordService.sendSecurityCodeToUpdatePassword(data).subscribe({
      next: (response)=>{
        if(response){
          this.isSecurityCodeSent = true;
        }
      },
      error: (error)=>{
        alert("error "+error.statusCode);
      },
      complete: ()=>{}
    });
  }
}
