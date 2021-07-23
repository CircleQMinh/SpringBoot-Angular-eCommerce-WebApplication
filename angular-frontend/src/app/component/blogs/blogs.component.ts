import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private blogService:BlogService) { }
  news:any[]=[]
  today:string=formatDate(Date.now(), 'yyyy-MM-dd', 'en');
  ngOnInit(): void {
    this.getNew()
  }
  getNew() {
    this.blogService.getNew().subscribe(
      data=>{
        this.news=data.articles
        console.log(this.news)
      }
    )
  }

}
