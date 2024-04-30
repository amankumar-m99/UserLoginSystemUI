import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Smtp } from 'src/app/model/smtp/smtp';
import { SmtpService } from 'src/app/services/smtp/smtp.service';
import { FormUtils } from 'src/app/utils/forms.util';

@Component({
  selector: 'app-smtp-controls',
  templateUrl: './smtp-controls.component.html',
  styleUrls: ['./smtp-controls.component.css']
})
export class SmtpControlsComponent implements OnInit{
  smtps:Smtp[];
  smtpForm!:FormGroup;

  @ViewChild('addNewSmtpFormModalCloseBtn') modalCloseBtn!:ElementRef;

  constructor(
    private smtpService:SmtpService,
    private formBuilder:FormBuilder
  )
  {
    this.smtps = [];
    this.smtpForm = this.formBuilder.group({
      label: ['', Validators.required],
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
    this.getAllSmtps(false);
  }

  submit():void{
    if(!this.smtpForm.valid){
      FormUtils.markAllFieldAsTouched(this.smtpForm);
      return;
    }
    this.save();
    this.modalCloseBtn.nativeElement.click();
  }

  save():void{
    this.smtpService.saveSmtp(this.smtpForm.value).subscribe(res=>{
      alert("Success.");
      this.getAllSmtps(true);
    }, error=>{
      console.log(error);
      alert("error "+error.statusCode);
    });
  }

  markAsSelected(smtp: Smtp):void{
    this.smtpService.markSelected(smtp).subscribe(e=>{
      this.getAllSmtps(true);
      alert("success");
    }, error=>{
      alert("Error in marking as selected");
    });
  }

  getAllSmtps(showModal:boolean):void{
    this.smtpService.getAllRecords().subscribe(res=>{
      this.smtps.length = 0;
      this.smtps = res;
      if(res.length == 0 && showModal)
        alert("No records found.");
    }, error=>{
      alert("error "+error.statusCode);
    });
  }

  get label(){
    return this.smtpForm.get("label");
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
