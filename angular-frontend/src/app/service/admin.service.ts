import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,private route:Router) { }


  getProducrForAdmin(page:number,pageSize:number,cate:string,orderby:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/getProducts?pageNumber=${page}&pageSize=${pageSize}
    &category=${cate}&orderBy=${orderby}`)
  }

  createProduct(pro: Object): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/Products/createProduct`, pro);
  }
  updateProduct(pro: Object): Observable<any> {
    return this.http.put(`http://localhost:8080/api/v1/Products/updateProduct`,pro);
  }
  deleteProduct(id:number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/v1/Products/deleteProduct/${id}`);
  }

  getUserForAdmin(page:number,pageSize:number,role:string,orderby:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/User/getUserList?pageNumber=${page}
    &pageSize=${pageSize}&role=${role}&orderBy=${orderby}`)
  }
  createUser(u: Object): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/User/createNewUser`, u);
  }
  updateUser(u: Object): Observable<any> {
    return this.http.put(`http://localhost:8080/api/v1/User/updateUser`,u);
  }
  deleteUser(id:number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/v1/User/deleteUser/${id}`);
  }
  getOrderForAdmin(page:number,pageSize:number,status:number,orderby:string,sort:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/getOrderList?pageNumber=${page}&pageSize=${pageSize}
    &status=${status}&orderBy=${orderby}&sort=${sort}`)
  }
  updateOrder(u: Object): Observable<any> {
    return this.http.put(`http://localhost:8080/api/v1/editOrder`,u);
  }
  getOrderDetail(id:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/getOrderDetail?id=${id}&pageNumber=1&pageSize=1000`)
  }
  deleteOrder(id:number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/v1/deleteOrder/${id}`);
  }

  getEventForAdmin(userid:number,from:string,to:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/event/getEventOfUser?id=${userid}&from=${from}&to=${to}`)
  }
  createEvent(u: Object): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/event/saveEvent`, u);
  }

}
