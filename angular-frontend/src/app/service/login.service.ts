import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogin:boolean=false;
  user:User=new User();


  constructor(private http: HttpClient) { }


  tryLogin(un:string,pw:string){

    return this.http.get(`http://localhost:8080/api/v1/User/login?un=${un}&pw=${pw}`);
  }

  getUserInfo(un: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/UserInfo/${un}`);
  }

  tryLogout(){
    this.isLogin=false;
    this.user=new User();
  }

  checkIfUsernameExist(un:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/User/checkIfUsernameExist?username=${un}`)
  }

  checkIfEmailExist(un:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/User/checkIfEmailExist?email=${un}`)
  }

  sendEmailVerify(email:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/sendEmailVerifyRegister?email=${email}`)
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`http://localhost:8080/api/v1/Users/createUser`, user);
  }

  sendEmailVerifyForgot(email:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/sendEmailVerifyForgot?email=${email}`)
  }
  resetUserPassword(email:string): Observable<Object> {
    return this.http.get(`http://localhost:8080/api/v1/sendEmailNewPassword?email=${email}`);
  }
}
