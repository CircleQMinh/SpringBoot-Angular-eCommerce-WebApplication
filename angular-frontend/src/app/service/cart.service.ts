import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:Product[]=[];
  cartItemsQuantity:number[]=[];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor(private httpClient: HttpClient) { }

  computeCartTotals() {
    let sum=0;
    let qua=0;
    for(let i = 0; i < this.cartItems.length; i++){
      let a:Product = this.cartItems[i];
      sum+=a.price!*this.cartItemsQuantity[i];
      qua+=this.cartItemsQuantity[i];
    }
    this.totalPrice.next(sum);
    this.totalQuantity.next(qua);

    // console.log(this.cartItems)
    // console.log("----")
    // console.log(this.cartItemsQuantity)
    // console.log("----")
    // console.log(this.totalPrice.)
    // console.log("----")
    // console.log(this.totalQuantity)
  }

  addToCart(pro:Product){
    let alreadyExistsInCart: boolean = false;
    
    for(let i = 0; i < this.cartItems.length; i++){
      let a:Product = this.cartItems[i];
      if(a.name==pro.name){
        alreadyExistsInCart=true;
        this.cartItemsQuantity[i]++;
        break;
      }
    }

    if(!alreadyExistsInCart){
      this.cartItems.push(pro);
      this.cartItemsQuantity.push(1);
    }
    this.computeCartTotals();
  }

  incrementQuantity(pro:Product){
    this.addToCart(pro);
  }
  decrementQuantity(pro:Product){
    for(let i = 0; i < this.cartItems.length; i++){
      let a:Product = this.cartItems[i];
      if(pro.name==a.name){
        if(this.cartItemsQuantity[i]>1){
          this.cartItemsQuantity[i]--;
          break;
        }
      }
    }
    this.computeCartTotals();
  }
  removeItem(pro:Product){
    for(let i = 0; i < this.cartItems.length; i++){
      let a:Product = this.cartItems[i];
      if(pro.name==a.name){
        this.cartItems.splice(i,1);
        this.cartItemsQuantity.splice(i,1);
        break;
      }
    }
    this.computeCartTotals();
  }

}
