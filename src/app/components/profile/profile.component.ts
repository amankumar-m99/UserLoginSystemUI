import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { StaticData } from 'src/app/static/static-data';
import { Utils } from 'src/app/utils/utils';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

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

  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  @ViewChild('profilePic') profilePic!:ElementRef;
  @ViewChild('fileUpload') inputFileElement!:ElementRef;
  @ViewChild('profilePicPreviewModalButton') profilePicPreviewModalButton!:ElementRef;

  constructor(
    private userService:UserService,
    private sanitizer: DomSanitizer
  ){ }

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

  click():void{
    this.inputFileElement.nativeElement.click();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.fileName = event.srcElement.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent) {
    let testStr:string = "";
    if(typeof event.objectUrl == "string"){
      testStr = event.objectUrl;
    }
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(testStr);
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
    this.profilePicPreviewModalButton.nativeElement.click();
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
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


}
