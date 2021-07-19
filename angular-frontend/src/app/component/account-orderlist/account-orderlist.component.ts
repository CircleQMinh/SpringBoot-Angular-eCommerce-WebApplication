import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBill } from 'src/app/class/order-bill';
import { User } from 'src/app/class/user';
import { AccountService } from 'src/app/service/account.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-account-orderlist',
  templateUrl: './account-orderlist.component.html',
  styleUrls: ['./account-orderlist.component.css']
})
export class AccountOrderlistComponent implements OnInit {
  user: User = new User()

  orders: OrderBill[] = []

  pageNumber: number = 1;
  pageSize: number = 5;
  pageOrder: string = "order_date"
  collectionSize: number = 0;

  status:string[]=["error","Processing","Processing","Shipping","Completed","Canceled"]

  constructor(private loginService: LoginService,
    private accountService: AccountService,
    private route: Router) { }

  ngOnInit(): void {
    this.isLogin()
  }


  isLogin() {
    if (this.loginService.isLogin == false) {
      this.route.navigateByUrl("/login")
    }
    else {
      this.user = this.loginService.user
      this.accountService.getUserOrder(this.user.id, this.pageOrder, this.pageNumber, this.pageSize).subscribe(
        data => {
          this.orders = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
        }
      )

    }
  }

  getPage() {
    this.accountService.getUserOrder(this.user.id, this.pageOrder, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.orders = data.content
        this.collectionSize = data.totalElements;
      }
    )

  }

  orderChange(){
    this.getPage()
  }

  setInfo(sum:number,qua:number){
    this.accountService.setInfoCurrentOrder(sum,qua)
  }

}
