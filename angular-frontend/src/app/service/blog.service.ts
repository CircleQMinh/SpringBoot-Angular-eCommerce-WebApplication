import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apikey:string="3113feaeeb294cee92641b976ba196de"
  constructor(private http: HttpClient,private route:Router) { }

  getNew():Observable<any>{
    return this.http.get(`https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${this.apikey}`)
  }

}
