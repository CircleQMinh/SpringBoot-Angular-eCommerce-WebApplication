import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/Products/${id}`);
  }

  getProductList(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/Products`);
  }

  getPage(pageNumber:number,pageSize:number,category:string): Observable<any>{

    return this.http.get(`http://localhost:8080/api/v1/Products?category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getSearchResult(keyword:string): Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/Products/search?keyword=${keyword}`)
  }

}

interface GetResponseProducts {
  content:Product[]
}
