import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-shipper-order-history',
  templateUrl: './shipper-order-history.component.html',
  styleUrls: ['./shipper-order-history.component.css']
})
export class ShipperOrderHistoryComponent implements OnInit {

  user: User = new User()
  constructor(private loginService: LoginService,
    private adminService: AdminService, private http: HttpClient,
    private router: Router, private modalService: NgbModal,private toast: HotToastService) { }

  ngOnInit(): void {
    this.isLogin
  }
  isLogin(){
    if (this.loginService.isLogin == false) {
      this.router.navigateByUrl("/login")
    }
    else {
      this.user = this.loginService.user
      if (this.user.role != 'admin') {
        this.router.navigateByUrl("/home")
      }
    
    }
  }

}