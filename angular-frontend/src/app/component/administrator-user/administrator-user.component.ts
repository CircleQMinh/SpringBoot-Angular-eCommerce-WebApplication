import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-administrator-user',
  templateUrl: './administrator-user.component.html',
  styleUrls: ['./administrator-user.component.css']
})
export class AdministratorUserComponent implements OnInit {
  user:User=new User()

  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;
  role: string = "all"
  orderby: string = "id"

  usersList:User[]=[]

  constructor(private loginService:LoginService,
              private adminService:AdminService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.isLogin()
  }
  isLogin(){
    if(this.loginService.isLogin==false){
      this.router.navigateByUrl("/login")
    }
    else{
      this.user=this.loginService.user
      if(this.user.role!='admin'){
        this.router.navigateByUrl("/home")
      }
      this.adminService.getUserForAdmin(this.pageNumber,this.pageSize,this.role,this.orderby).subscribe(
        data=>{
          this.usersList = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
        }
      )
    }
  }

  getPage(){
    this.adminService.getUserForAdmin(this.pageNumber, this.pageSize, this.role, this.orderby).subscribe(
      data => {
        this.usersList = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
  getNewPage(){
    this.pageNumber = 1
    this.adminService.getUserForAdmin(this.pageNumber, this.pageSize, this.role, this.orderby).subscribe(
      data => {
        this.usersList = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
}
