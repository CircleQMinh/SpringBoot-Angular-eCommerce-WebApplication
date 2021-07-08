import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  sentEmailVerifyPassword(email:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/requestVerifyCode?email=${email}`)
  }

  verifyChangePassword(email:string,code:string,pass:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/requestVerifyChangePassword?email=${email}&code=${code}&pass=${pass}`)
  }


  getUserOrder(id:number,order:string,page:number,pagesize:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/getUserOrders?id=${id}&pageNumber=${page}&pageSize=${pagesize}&order=${order}`)
  }

}
