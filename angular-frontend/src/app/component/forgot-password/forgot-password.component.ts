import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email!:string
  emailError: boolean=false;
  verifyError:boolean=false;
  verifyCode!:string
  verifyInfo:any
  verifyComplete:boolean=false;
  verifyMode:boolean=false
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  async tryReset(){
    const response = await this.loginService.checkIfEmailExist(this.email).toPromise();
    this.emailError=!response.success
    if(this.emailError==false){
      this.sendEmailverify()
    }

  }
  async sendEmailverify(){
    this.verifyMode=true
    this.verifyInfo= await this.loginService.sendEmailVerifyForgot(this.email).toPromise()
    
  }

  checkValidateCode(){
    this.verifyError=false
    if(this.verifyCode==this.verifyInfo.code){
      this.resetPassword()
    }
    else{
      this.verifyError=true;
    }


  }

  resetPassword(){
    this.verifyComplete=true
    this.loginService.resetUserPassword(this.email).subscribe(
      data =>{
      }
    )
    
  }

}
