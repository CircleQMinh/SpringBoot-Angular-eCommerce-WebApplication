import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username?:string;
  password?:string;
  dataRegister:any={}
  loginFailed:boolean=false;
  constructor(private loginService : LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  async tryLogin(){
    this.loginService.tryLogin(this.username!,this.password!)
    .subscribe(
      async data => {
        this.dataRegister=data;
        if(this.dataRegister.success==true){
          this.loginFailed=false;
          await this.getUserInfo();
          this.router.navigate(['/home']);
          this.loginService.isLogin=true;
        }
        else{
          this.loginFailed=true;
          this.loginService.isLogin=false;
        }
        
      },
      error => console.log(error));
  }

  getUserInfo(){
    this.loginService.getUserInfo(this.username!)
      .subscribe(data => {
        //console.log(data)
        this.loginService.user = data;
      }, error => console.log(error));
  }
}
