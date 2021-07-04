import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/class/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartItems:Product[] = [];
  cartItemQuantity:number[]=[];
  totalPrice!:number;
  totalItem!:number;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
    this.getCartInfo();
  }
  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.computeCartTotals();


    this.cartItems=this.cartService.cartItems
    this.cartItemQuantity=this.cartService.cartItemsQuantity



  }

  getCartInfo(){
    let sum=0;
    let qua=0;
    for(let i = 0; i < this.cartItems.length; i++){
      let a:Product = this.cartItems[i];
      sum+=a.price!*this.cartItemQuantity[i];
      qua+=this.cartItemQuantity[i];
    }
    this.totalItem=qua
    this.totalPrice=sum
  }

  incrementQuantity(pro:Product){
    this.cartService.incrementQuantity(pro);
    this.getCartInfo()
  }
  decrementQuantity(pro:Product){
    this.cartService.decrementQuantity(pro)
    this.getCartInfo()
  }
  removeItem(pro:Product){
    this.cartService.removeItem(pro)
    this.getCartInfo()
  }


}
