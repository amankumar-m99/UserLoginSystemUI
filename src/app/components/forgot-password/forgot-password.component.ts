import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
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

  constructor(
    private formBuilder:FormBuilder,
    private updatePasswordService:UpdatePasswordService,
    private activatedroute:ActivatedRoute
  ){
    let emailId = this.activatedroute.snapshot.paramMap.get("emailId");
    this.forgotPasswordForm = this.formBuilder.group({
      username: [emailId, Validators.required],
    });
    this.fillSecurityCodeForm = this.formBuilder.group({
      securityCode: ['', Validators.required]
    });
    this.isSecurityCodeSent = false;
  }

  submitEmail():void{
    let username = this.forgotPasswordForm.get('username')?.value;
    this.updatePasswordService.sendSecurityCodeToUpdatePassword(username).subscribe({
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

  submitSecurityCode():void{

  }
}
