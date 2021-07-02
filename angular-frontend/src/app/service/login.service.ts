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
    console.log("kakkaka");
    console.log(un);
    console.log(pw);
    console.log("kakkaka");
    return this.http.get(`http://localhost:8080/api/v1/User/login?un=${un}&pw=${pw}`);
  }

  getUserInfo(un: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/UserInfo/${un}`);
  }

  tryLogout(){
    this.isLogin=false;
    this.user=new User();
  }
}
