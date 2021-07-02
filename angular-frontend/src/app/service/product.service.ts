import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private http: HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/Products`);
  }

}
