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
  fileName="";
  border_color = "green";
  badge_class = "text-bg-success";
  profilePicSrc = StaticData.apiBaseUrl+"/images/profile-pic/" + Utils.getCookie("userId");
  fallbackImageSrc = "../../../assets/images/profile_pic_green.png";

  imageChangedEvent: any = '';
  imageCroppedEvent!: ImageCroppedEvent;
  croppedImage: any = '';
  disableSubmitBtn = false;

  @ViewChild('profilePic') profilePic!:ElementRef;
  @ViewChild('fileInputTag') fileInputTag!:ElementRef;
  @ViewChild('profilePicPreviewModalCloseButton') profilePicPreviewModalCloseButton!:ElementRef;
  @ViewChild('profilePicPreviewModalLaunchButton') profilePicPreviewModalLaunchButton!:ElementRef;

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

  openProfilePicPreviewModal(){
    this.profilePicPreviewModalLaunchButton.nativeElement.click();
  }
  
  closeProfilePicPreviewModal(){ 
    this.profilePicPreviewModalCloseButton.nativeElement.click();
  }

  openFileChooser():void{
    this.fileInputTag.nativeElement.click();
  }

  uploadProfilePic():void{
    if(this.imageCroppedEvent.blob != null){
      const file = new File([this.imageCroppedEvent.blob], this.fileName);
      this.disableSubmitBtn = true;
      this.userService.uploadPic(file).subscribe({
        next: (response)=>{
          this.closeProfilePicPreviewModal();
        },
        error: (error)=>{
          this.disableSubmitBtn = false;
          console.log(error);
        },
        complete: ()=>{
          this.disableSubmitBtn = false;
        }
      });
    }
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
    this.imageCroppedEvent = event;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
    this.openProfilePicPreviewModal();
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
