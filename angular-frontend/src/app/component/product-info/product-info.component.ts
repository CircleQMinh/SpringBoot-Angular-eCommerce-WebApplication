import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/class/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product!:Product
  nextId:number=2;
  prevId:number=1;
  isNull:boolean=false
  constructor(private productService:ProductService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    const id:number = Number(this.route.snapshot.paramMap.get("id"));
    this.getInfo(id)
  }
  getInfo(id:number){
    this.productService.getProduct(id).subscribe(
      data =>{

        this.product=data
        this.nextId=Number(this.product.id)+1
        this.prevId=Number(this.product.id)-1
      }
    )
  }

  next(){
    this.router.navigateByUrl(`/products/${this.nextId}`)
    this.getInfo(this.nextId)
  }
  prev(){
    this.router.navigateByUrl(`/products/${this.prevId}`)
    this.getInfo(this.prevId)
  }

}
