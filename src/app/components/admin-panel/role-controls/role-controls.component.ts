import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/model/role/role';
import { RoleService } from 'src/app/services/role/role.service';
import { FormUtils } from 'src/app/utils/forms.util';

@Component({
  selector: 'app-role-controls',
  templateUrl: './role-controls.component.html',
  styleUrls: ['./role-controls.component.css']
})
export class RoleControlsComponent implements OnInit{
  roles:Role[];
  roleForm:FormGroup;

  @ViewChild('addNewSmtpFormModalCloseBtn') modalCloseBtn!:ElementRef;

  constructor(
    private roleService:RoleService,
    private formBuilder:FormBuilder
  )
  {
    this.roles = [];
    this.roleForm = this.formBuilder.group({
      roleId: ['', Validators.required],
      roleName: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getAllRoles(false);
  }

  submit():void{
    if(!this.roleForm.valid){
      FormUtils.markAllFieldAsTouched(this.roleForm);
      return;
    }
    this.save();
    this.modalCloseBtn.nativeElement.click();
  }

  save():void{
    this.roleService.saveRole(this.roleForm.value).subscribe({
      next: (response)=>{
        alert("Success.");
        this.getAllRoles(true);
      },
      error: (error)=>{
        alert("error "+error.statusCode);
      },
      complete: ()=>{}
    });
  }

  getAllRoles(showModal:boolean):void{
    this.roleService.getAllRecords().subscribe({
      next: (response)=>{
        this.roles.length = 0;
        this.roles = response;
        if(response.length == 0 && showModal)
          alert("No records found.");
      },
      error: (error)=>{
        alert("error "+error.statusCode);
        console.log(error);
      },
      complete: ()=>{}
    });
  }

  get roleId(){
    return this.roleForm.get("roleId");
  }
  get roleName(){
    return this.roleForm.get("roleName");
  }
  get roleDescription(){
    return this.roleForm.get("roleDescription");
  }
}
