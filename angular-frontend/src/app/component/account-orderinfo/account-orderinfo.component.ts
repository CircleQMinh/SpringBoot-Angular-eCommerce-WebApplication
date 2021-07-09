import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from 'src/app/class/order-detail';
import { User } from 'src/app/class/user';
import { AccountService } from 'src/app/service/account.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-account-orderinfo',
  templateUrl: './account-orderinfo.component.html',
  styleUrls: ['./account-orderinfo.component.css']
})
export class AccountOrderinfoComponent implements OnInit {
  
  user: User = new User()
  id!:number
  orderDetails:OrderDetail[]=[]
  pageSize: number = 5;
  pageNumber: number = 1;
  collectionSize: number = 0;

  totalItem:number=0
  totalCost:number=0


  constructor(private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogin()
  }

  isLogin() {
    if (this.loginService.isLogin == false) {
      this.router.navigateByUrl("/login")
    }
    else {
      this.user = this.loginService.user
      this.totalCost=this.accountService.currentOrderCost
      this.totalItem=this.accountService.currentOrderQuantity
      this.id=Number(this.route.snapshot.paramMap.get("id"))
      this.accountService.getOrderDetail(this.id,this.pageNumber).subscribe(
        data =>{
          this.orderDetails = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
         // this.calculateOrder()
         
        }
      )

    }
  }
  getPage(){
    this.accountService.getOrderDetail(this.id,this.pageNumber).subscribe(
      data =>{
        this.orderDetails = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }

  calculateOrder(){
    let sum:number=0;
    let qua:number=0;
    for(let i=0;i<this.orderDetails.length;i++){
      sum+=this.orderDetails[i].product.price*this.orderDetails[i].quantity
      qua+=this.orderDetails[i].quantity
    }
    this.totalCost=sum
    this.totalItem=qua
  }
}
