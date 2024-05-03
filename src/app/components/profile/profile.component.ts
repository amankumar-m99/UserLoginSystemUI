import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { StaticData } from 'src/app/static/static-data';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user!: User;
  border_color = "green";
  badge_class = "text-bg-success";
  profileSrcSet = StaticData.apiBaseUrl+"/images/profile-pic/"+Utils.getCookie("userId");

  @ViewChild('fileUpload') inputFileElement!:ElementRef;

  constructor(private userService:UserService){ }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res=>{
      this.user = res;
    }, error=>{
      alert("Error in fetching data");
    });
  }

  getName():string{
    if(this.user === undefined || this.user == null)
      return "N/A";
    let name = this.user?.personalDetails.firstName;
    return name;
  }

  getEmail():string{
    if(this.user === undefined || this.user == null)
      return "N/A";
    let email = this.user?.email;
    return email;
  }

  getUserName():string{
    if(this.user === undefined || this.user == null)
      return "N/A";
    let username = this.user?.username;
    return username;
  }

  getRoleName():string{
    if(this.user === undefined || this.user == null)
      return "N/A";
    let roleName = this.user?.roles[0].roleName;
    if(roleName === undefined || roleName == null)
      return "N/A";
    return roleName;
  }

  onFileSelected(event: any):void{
    const file:File = event.target.files[0];
    if (file) {
      this.userService.uploadPic(file).subscribe(res=>{
        this.profileSrcSet = StaticData.apiBaseUrl+ res.response;
        alert(res.response);
      }, error=>{
        console.log(error);
      });
    }
  }

  click():void{
    this.inputFileElement.nativeElement.click();
  }
}
