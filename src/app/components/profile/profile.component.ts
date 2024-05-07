import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { StaticData } from 'src/app/static/static-data';
import { Utils } from 'src/app/utils/utils';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{
  user!: User;
  border_color = "green";
  badge_class = "text-bg-success";
  profilePicSrc = StaticData.apiBaseUrl+"/images/profile-pic/" + Utils.getCookie("userId");
  fallbackImageSrc = "../../../assets/images/profile_pic_green.png";
  fileName="";
  uploadedImgSrc:any=""
  cropper!:Cropper;
  
  @ViewChild('profilePic') profilePic!:ElementRef;
  @ViewChild('fileUpload') inputFileElement!:ElementRef;
  @ViewChild('uploadedImage') uploadedImage!:ElementRef;
  @ViewChild('profilePicPreviewModalButton') profilePicPreviewModalButton!:ElementRef;

  constructor(private userService:UserService){ }
  ngAfterViewInit(): void {
    this.profilePic.nativeElement.addEventListener("error", (e:any) => {
      this.profilePicSrc = this.fallbackImageSrc;
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (response)=>{
        this.user = response;
      },
      error: (error)=>{
        alert("Error in fetching data");
      },
      complete: ()=>{}
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
      this.profilePicPreviewModalButton.nativeElement.click();
      this.uploadedImgSrc = file.webkitRelativePath+file.name;
      this.fileName = this.uploadedImgSrc;
      this.uploadedImgSrc = URL.createObjectURL(file);
      // this.cropper = new Cropper(this.uploadedImage.nativeElement, {
      //   zoomable:false,
      //   scalable: false,
      //   aspectRatio: 1,
      //   crop: ()=>{
      //     const canvas = this.cropper.getCroppedCanvas();
      //     this.imageDestination = canvas.toDataURL("image/png");
      //   }
      // });
      // const reader = new FileReader();
      // reader.onload = e =>  this.uploadedImgSrc = reader.result;
      // reader.readAsDataURL(file);
      // this.userService.uploadPic(file).subscribe({
      //   next: (response)=>{ alert(response.response);},
      //   error: (error)=>{
      //     console.log(error);
      //   alert(error.error.message);
      //   },
      //   complete: ()=>{}
      // });
    }
  }

  click():void{
    this.inputFileElement.nativeElement.click();
  }

}
