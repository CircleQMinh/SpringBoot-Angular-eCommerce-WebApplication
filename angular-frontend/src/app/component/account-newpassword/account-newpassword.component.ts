import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AccountService } from 'src/app/service/account.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-account-newpassword',
  templateUrl: './account-newpassword.component.html',
  styleUrls: ['./account-newpassword.component.css']
})
export class AccountNewpasswordComponent implements OnInit {
  user:User=new User()
  password!:string
  code!:string
  repassword!:string
  passError:boolean=false
  repeatError:boolean=false
  emailSent:boolean=false

  verifyError:boolean=false
  verifyComplete:boolean=false
  constructor(private loginService:LoginService,
    private accountService:AccountService,
    private route:Router) { }

  ngOnInit(): void {
    this.isLogin()
  }


  isLogin(){
    if(this.loginService.isLogin==false){
      this.route.navigateByUrl("/login")
    }
    else{
      this.user=this.loginService.user
    }
  }

  tryResetPass(){

    this.repeatError=false
    this.passError=false
    if(this.password!=this.repassword){
      this.repeatError=true
    }
    else if(this.password==undefined||this.password.length<8){
      this.passError=true;
    }
    else{
      if(this.emailSent==false){
        this.accountService.sentEmailVerifyPassword(this.user.email).subscribe(
          data =>{

          }
        )
      }
      this.emailSent=true
    }
  }

  async tryVerify(){
    this.verifyError=false
    this.repeatError=false
    this.passError=false
    console.log(this.code)
    console.log(this.password)
    console.log(this.user.email)
    if(this.code==undefined){
     this.verifyError=true
    }
    else if(this.password!=this.repassword){
      this.repeatError=true
    }
    else if(this.password==undefined||this.password.length<8){
      this.passError=true;
    }
    else{
      await this.accountService.verifyChangePassword(this.user.email,this.code,this.password).subscribe(
        data =>{
          this.verifyComplete=data.success
          console.log(data)
        }
      )
    }
    
  }

}
