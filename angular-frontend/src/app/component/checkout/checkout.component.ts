import { DatePipe, formatDate } from '@angular/common';
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
  user: User = new User()
  cartItems: Product[] = [];
  cartItemsQuantity: number[] = [];
  totalPrice: any;
  totalQuantity: any;

  contactName!: string
  email!: string
  phone!: string

  home!: string
  street!: string
  ward!: string
  dis!: string

  order: OrderBill = new OrderBill()
  orderDetails: OrderDetail[] = []

  District: string[] = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10',
    'Quận 11', 'Quận 12', 'Quận Thủ Đức', 'Quận Gò Vấp', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Phú Nhuận', 'Quận Bình Tân'
    , 'Huyện Củ Chi', 'Huyện Hóc Môn', 'Huyện Bình Chánh', 'Huyện Nhà Bè', 'Huyện Cần Giờ']

  Ward: string[] = ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10',
    'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15']

  nameError: boolean = false
  emailError: boolean = false
  phoneError: boolean = false
  addressError: boolean = false

  regexp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

  orderCreated: boolean = false
  orderComplete: boolean = false
  isLoading: boolean = false


  today:string=""

  constructor(private loginService: LoginService,
    private accountService: AccountService,
    private cartService: CartService,
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
      this.cartItems = this.cartService.cartItems
      this.cartItemsQuantity = this.cartService.cartItemsQuantity
      this.computeCartTotals()
    }
  }

  computeCartTotals() {
    let sum = 0;
    let qua = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      let a: Product = this.cartItems[i];
      sum += a.price! * this.cartItemsQuantity[i];
      qua += this.cartItemsQuantity[i];
    }
    this.totalPrice = sum
    this.totalQuantity = qua
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  async sendOrder() {
    if (this.validateOrder() == true) {
      this.createOrder()
      if (this.orderComplete == false) {
        this.isLoading = true
        this.cartService.saveOrder(this.order).subscribe(
          data => {

            this.order.id = data.id;
            this.saveOrderDetail()
            this.cartService.emptyCart()
           
          }
        )
      }
    }
    await this.delay(3000);
    this.orderComplete = true
  }

  saveOrderDetail() {
    for (let i = 0; i < this.orderDetails.length; i++) {
      this.orderDetails[i].order = this.order
      this.cartService.saveOrderDetail(this.orderDetails[i]).subscribe(
        data => {

        }
      )
    }
  }

  validateOrder(): boolean {
    this.nameError = false
    this.emailError = false
    this.phoneError = false
    this.addressError = false

    if (this.contactName == undefined) {
      this.nameError = true
      return false
    }
    if (this.contactName.trim() == "") {
      this.nameError = true
      return false
    }
    if (this.email == undefined) {
      this.emailError = true
      return false
    }
    if (!this.regexp.test(this.email)) {
      this.emailError = true
      return false
    }
    if (this.phone == undefined) {
      this.phoneError = true
      return false
    }
    else if (this.phone.length < 9) {
      this.phoneError = true
      return false
    }

    if (this.home == undefined || this.street == undefined || this.ward == undefined || this.dis == undefined) {
      this.addressError = true
      return false
    }
    if (this.home.trim() == "" || this.street.trim() == "") {
      this.addressError = true
      return false
    }
    return true
  }

  createOrder() {
    if (this.orderCreated == false) {
      this.order.user = this.user
      this.order.contactName = this.contactName
      this.order.address = this.home + " " + this.street + " " + this.ward + " " + this.dis + " " + "TP.HCM"
      this.order.phone = this.phone
      this.order.email = this.email
      this.order.paymentMethod = "cash"
      this.order.status = 1
      this.today=formatDate(Date.now(), 'yyyy-MM-dd', 'en');
      this.order.orderDate=this.today
      this.order.totalItem=this.totalQuantity
      this.order.totalPrice=this.totalPrice
      for (let i = 0; i < this.cartItems.length; i++) {
        let od: OrderDetail = new OrderDetail()
        od.order = this.order
        od.product = this.cartItems[i]
        od.quantity = this.cartItemsQuantity[i]
        this.orderDetails.push(od)
      }
      this.orderCreated = true
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
