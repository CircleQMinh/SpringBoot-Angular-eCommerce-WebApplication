import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBill } from 'src/app/class/order-bill';
import { OrderDetail } from 'src/app/class/order-detail';
import { Product } from 'src/app/class/product';
import { User } from 'src/app/class/user';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user:User=new User()
  cartItems:Product[]=[];
  cartItemsQuantity:number[]=[];
  totalPrice: any;
  totalQuantity: any;

  contactName!:string
  email!:string
  phone!:string

  home!:string
  street!:string
  ward!:string
  dis!:string

  order:OrderBill=new OrderBill()
  orderDetails:OrderDetail[]=[]

  District:string[]=['Quận 1','Quận 2','Quận 3','Quận 4','Quận 5','Quận 6','Quận 7','Quận 8','Quận 9','Quận 10',
  'Quận 11','Quận 12','Quận Thủ Đức','Quận Gò Vấp','Quận Bình Thạnh','Quận Tân Bình','Quận Tân Phú','Quận Phú Nhuận','Quận Bình Tân'
  ,'Huyện Củ Chi','Huyện Hóc Môn','Huyện Bình Chánh','Huyện Nhà Bè','Huyện Cần Giờ']

  Ward:string[]=['Phường 1','Phường 2','Phường 3','Phường 4','Phường 5','Phường 6','Phường 7','Phường 8','Phường 9','Phường 10',
  'Phường 11','Phường 12','Phường 13','Phường 14','Phường 15']

  constructor(private loginService:LoginService,
    private accountService:AccountService,
    private cartService:CartService,
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
      this.cartItems=this.cartService.cartItems
      this.cartItemsQuantity=this.cartService.cartItemsQuantity
      this.computeCartTotals()
      //this.createOrder()
      console.log(this.cartItems)
      console.log(this.cartItemsQuantity)
    }
  }

  computeCartTotals() {
    let sum=0;
    let qua=0;
    for(let i = 0; i < this.cartItems.length; i++){
      let a:Product = this.cartItems[i];
      sum+=a.price!*this.cartItemsQuantity[i];
      qua+=this.cartItemsQuantity[i];
    }
    this.totalPrice=sum
    this.totalQuantity=qua
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  sendOrder(){
    // this.validateOrder()

    this.createOrder()
    console.log(this.order)
    console.log(this.orderDetails)
 


  }

  validateOrder(){
    console.log("validate order!!!")
  }

  createOrder(){
    this.order.user=this.user
    this.order.contactName=this.contactName
    this.order.address=this.home+" "+this.street+" "+this.ward+" "+this.dis+" "+"TP.HCM"
    this.order.phone=this.phone
    this.order.email=this.email   
    this.order.paymentMethod="cash"
    this.order.status=1

    for(let i=0;i<this.cartItems.length;i++){
      let od:OrderDetail=new OrderDetail()
      od.order=this.order
      od.product=this.cartItems[i]
      od.quantity=this.cartItemsQuantity[i]
      this.orderDetails.push(od)
    }
  }
}
