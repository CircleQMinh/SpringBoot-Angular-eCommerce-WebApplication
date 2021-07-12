import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username!:string;
  url!:string;

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
  }

  isLogin():boolean{
    this.username=this.loginService.user.name;
    this.url=this.loginService.user.imgUrl
    return this.loginService.isLogin;
  }

}
