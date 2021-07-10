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

}
