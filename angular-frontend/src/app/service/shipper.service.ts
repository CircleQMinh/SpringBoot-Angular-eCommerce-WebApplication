import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(private http: HttpClient) { }

  acceptOrder(id:number,bill_id:number): Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/Order/acceptOrder?id=${id}&bill_id=${bill_id}`)
  }
  getacceptedOrder(id:number,page:number,size:number): Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/Order/getShipperAcceptedOrder?id=${id}&pageNumber=${page}&pageSize=${size}`)
  }
}
