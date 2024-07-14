import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { UpdatePasswordService } from 'src/app/services/update-password/update-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private updatePasswordService:UpdatePasswordService
  ){
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  submit():void{
    let username = this.forgotPasswordForm.get('username')?.value;
    this.updatePasswordService.sendSecurityCodeToUpdatePassword(username).subscribe({
      next: (response)=>{
        alert(response);
      },
      error: (error)=>{
        alert("error "+error.statusCode);
      },
      complete: ()=>{}
    });
  }
}
