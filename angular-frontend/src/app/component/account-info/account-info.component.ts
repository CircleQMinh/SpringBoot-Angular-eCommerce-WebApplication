import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

}
