import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/class/user';
import { AccountService } from 'src/app/service/account.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user:User=new User()

  displayName!:string;
  imgURL: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"

  isUpload:boolean=false
  dataRegister: any = {}

  nameError:boolean=false
  phoneError:boolean=false
  imgError:boolean=false

  constructor(private loginService:LoginService,
              private accountService:AccountService,
              private route:Router,private toast: HotToastService,private modalService: NgbModal,
              private http: HttpClient,) { }

  ngOnInit(): void {
    this.isLogin()
  }

  isLogin(){
    if(this.loginService.isLogin==false){
      this.route.navigateByUrl("/login")
    }
    else{
      this.user=this.loginService.user
      this.displayName=this.user.name
    }
  }

  updateUserInfo(){
    if(this.validateInput()){
      let newUserInfo:User = new User
      newUserInfo.phone=this.user.phone
      newUserInfo.name=this.displayName
      newUserInfo.username=this.user.username
      this.accountService.updateUserInfo(newUserInfo).subscribe(
        data=>{
          this.toast.success("Save complete!")
          this.loginService.getUserInfo(this.user.username).subscribe(
            data=>{
              this.user=data
              this.loginService.user=this.user
              this.displayName=this.user.name
            })
        },
        error=>{
          this.toast.error("An error has occurred. Please try again!")
        }
      )
    }
    
  }

  validateInput():boolean{

    this.nameError=false
    this.phoneError=false

    if(this.displayName.trim().length==0){
      this.nameError=true
      
    }
    if(this.user.phone.trim().length==0||this.user.phone.length<9){
      this.phoneError=true
    }

    let errorList:boolean[]=[]
    errorList.push(this.nameError)
    errorList.push(this.phoneError)
    for(let e of errorList){
      if(e){
        return false
      }
    }
    return true


  }


  openChangeIMGModal(changeIMG:any){
    this.modalService.open(changeIMG, { ariaLabelledBy: 'modal-basic-title' })
  }

  uploadImage(event: any) {
    var that = this;
    this.isUpload=true;
    this.create_blob(event.srcElement.files[0], function (blob_string) {
      that.http.post('https://api.cloudinary.com/v1_1/dkmk9tdwx/image/upload', { file: blob_string, upload_preset: 'v0q5hczm' }).subscribe(res => {
        that.dataRegister = res
        that.imgURL = that.dataRegister.url
        console.log(that.imgURL)
        that.imgError=false
        that.isUpload=false
      },
      error =>{
        console.log(error)
        that.toast.error("Image format is not valid!")
        that.imgURL= "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
        that.imgError=true
      })
    })
  }

  
  create_blob(file: Blob, callback: (arg0: string | ArrayBuffer | null) => void) {
    var reader = new FileReader();
    reader.onload = function () { callback(reader.result) };
    reader.readAsDataURL(file);
  }

  changeUserIMGProfile(){
    if(this.imgError==false){
      let newUserInfo:User = new User
      newUserInfo.username=this.user.username
      newUserInfo.imgUrl=this.imgURL
      this.accountService.updateUserIMG(newUserInfo).subscribe(
        data=>{
          this.toast.success("Save complete!")
          this.modalService.dismissAll()
          this.loginService.getUserInfo(this.user.username).subscribe(
            data=>{
              this.user=data
              this.loginService.user=this.user
              
            })

        },
        error=>{
          this.toast.error("An error has occurred. Please try again!")
        }
      )
    }
    else{
      this.toast.error("Image format is not valid!")
    }
  }

}
