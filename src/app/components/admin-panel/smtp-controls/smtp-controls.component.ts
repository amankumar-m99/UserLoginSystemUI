import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Smtp } from 'src/app/model/smtp/smtp';
import { SmtpService } from 'src/app/services/smtp/smtp.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-smtp-controls',
  templateUrl: './smtp-controls.component.html',
  styleUrls: ['./smtp-controls.component.css']
})
export class SmtpControlsComponent implements OnInit{
  smtps:Smtp[];
  smtpForm!:FormGroup;

  @ViewChild('modalCloseBtn') modalCloseBtn!:ElementRef;

  constructor(
    private smtpService:SmtpService,
    private formBuilder:FormBuilder
  )
  {
    this.smtps = [];
    this.smtpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      host: ['', Validators.required],
      port: ['', Validators.required],
      auth: [false, Validators.required],
      starttlsEnable: [false, Validators.required],
      isSelected: [false, Validators.required]
    });
  }
  ngOnInit(): void {
    this.getAllRecords();
  }

  save():void{
    if(!this.smtpForm.valid){
      Utils.markAllFieldAsTouched(this.smtpForm);
      return;
    }
    this.saveSmtp();
    this.modalCloseBtn.nativeElement.click();
  }

  getAllRecords():void{
    this.smtpService.getAllRecords().subscribe(res=>{
      if(res.length == 0)
        alert("No records found.")
      else{
        this.smtps.length = 0;
        this.smtps = res;
      }
    }, error=>{
      alert("error "+error.statusCode);
    });
  }

  submit():void{
  }

  saveSmtp():void{
    this.smtpService.saveSmtp(this.smtpForm.value).subscribe(res=>{
      alert("Success.");
      this.getAllRecords();
    }, error=>{
      alert("error "+error.statusCode);
    });
  }

  get username(){
    return this.smtpForm.get("username");
  }
  get password(){
    return this.smtpForm.get("password");
  }
  get host(){
    return this.smtpForm.get("host");
  }
  get port(){
    return this.smtpForm.get("port");
  }
  get auth(){
    return this.smtpForm.get("auth");
  }
  get startTtls(){
    return this.smtpForm.get("starttlsEnable");
  }
  get isSelected(){
    return this.smtpForm.get("isSelected");
  }
}
