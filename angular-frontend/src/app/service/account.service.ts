import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderBill } from '../class/order-bill';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentOrderQuantity:number=0
  currentOrderCost:number=0

  constructor(private http: HttpClient) { }


  updateUserInfo(u:User):Observable<any>{
    return this.http.put(`http://localhost:8080/api/v1/Users/updateInfo/${u.username}`,u)
  }
  
  updateUserIMG(u:User):Observable<any>{
    return this.http.put(`http://localhost:8080/api/v1/Users/updateImg/${u.username}`,u)
  }
  

  sentEmailVerifyPassword(email:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/requestVerifyCode?email=${email}`)
  }

  verifyChangePassword(email:string,code:string,pass:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/requestVerifyChangePassword?email=${email}&code=${code}&pass=${pass}`)
  }


  getUserOrder(id:number,order:string,page:number,pagesize:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/getUserOrders?id=${id}&pageNumber=${page}&pageSize=${pagesize}&order=${order}`)
  }
  getOrderDetail(id:number,page:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/getOrderDetail?id=${id}&pageNumber=${page}`)
  }
  getOrderInfo(id:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/Order/getOrder/${id}`)
  }

  setInfoCurrentOrder(sum:number,qua:number){
    this.currentOrderCost=sum
    this.currentOrderQuantity=qua
  }

  
  editOrderStatus(u:OrderBill):Observable<any>{
    return this.http.put(`http://localhost:8080/api/v1/editOrder`,u)
  }
  getUserFavoriteItem(id:number,page:number,pagesize:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/account/favoriteItem?id=${id}&pageNumber=${page}&pageSize=${pagesize}`)
  }
  deleteFromFav(id:number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/v1/account/removeFromFav/${id}`);
  }
}
