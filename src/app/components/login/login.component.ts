import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormModel } from 'src/app/model/login/login-form-model';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  modalTitleText:string = "Title";
  modalBodyText:string = "Body";
  disableSubmitBtn = false;

  @ViewChild('launch_modal') launchModalButton!:ElementRef;

  loginForm : FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private userService:UserService,
    private router:Router
    ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(){
    let email:string = this.loginForm.get("username")?.value;
    let password:string = this.loginForm.get("password")?.value;
    let loginFormModel = new LoginFormModel(email, password);
    this.disableSubmitBtn=true;
    this.loginService.login(loginFormModel).subscribe(res=>{
      Utils.setCookie("userId", res.userId.toString());
      Utils.setCookie("token", res.jwtToken);
      this.userService.getCurrentUser().subscribe(user=>{
        let roleId = user.roles[0].id;
        for(let role of user.roles){
          if(role.id < roleId)
            roleId = role.id;
        }
        Utils.setRoleId(roleId.toString());
        this.disableSubmitBtn = false;
        this.router.navigate(['/dashboard']);
      }, error=>{
        this.disableSubmitBtn = false;
        alert("Error while navigation to dashboard.");
      });
    }, error=>{
      this.disableSubmitBtn = false;
      console.log(error);
      if(error.status == 0){
        this.modalTitleText = "Error";
        this.modalBodyText = "Couldn't connect to server.";
      }
      else{
        this.modalTitleText = "Error "+error.status;
        this.modalBodyText = error.error.message;
      }
      this.launchModalButton.nativeElement.click();
    })
  }
}
