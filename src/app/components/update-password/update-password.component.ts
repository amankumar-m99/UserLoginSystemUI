import { Component, OnInit } from '@angular/core';
import { EmailFormModel } from 'src/app/model/email/email-form.model';
import { UpdatePasswordService } from 'src/app/services/update-password/update-password.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  isSecurityCodeSent = false;
  isRequestInProgress = false;
  email = "N/A";
  constructor(
    private updatePasswordService:UpdatePasswordService
  ){}
  ngOnInit(): void {
    this.email = Utils.getCookie("userEmail");
  }

  sendSecurityCode(){
    this.isRequestInProgress = true;
    let data = new EmailFormModel(this.email);
    this.updatePasswordService.sendSecurityCodeToUpdatePassword(data).subscribe({
      next: (response)=>{
        if(response){
          this.isRequestInProgress = false;
          this.isSecurityCodeSent = true;
        }
      },
      error: (error)=>{
        this.isRequestInProgress = false;
        alert("error "+error.statusCode);
      },
      complete: ()=>{}
    });
  }
}
