import { Component } from '@angular/core';
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
    this.loginService.login(loginFormModel).subscribe(res=>{
      // localStorage.setItem("jwt", res.jwtToken);
      // localStorage.setItem("username", res.username);
      Utils.setCookie("username", res.username);
      Utils.setCookie("token", res.jwtToken);
      this.userService.getUserInfo(res).subscribe(user=>{
        let roleId = user.roles[0].id;
        for(let role of user.roles){
          if(role.id < roleId)
            roleId = role.id;
        }
        switch(roleId){
          case 1: this.router.navigate(['/admin-dashboard']); break;
          default: this.router.navigate(['/dashboard']); break;
        }
      }, error=>{
        alert("Error while navigation to dashboard.")
      });

    }, error=>{
      alert("Error while loging in. "+error.status);
    })
  }
}
