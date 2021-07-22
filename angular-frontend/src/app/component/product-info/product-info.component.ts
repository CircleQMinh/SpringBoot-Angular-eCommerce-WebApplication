import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from 'src/app/class/product';
import { Review } from 'src/app/class/review';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {



  product!: Product
  nextId: number = 2;
  prevId: number = 1;
  isNull: boolean = false

  pageNumber: number = 1;
  pageSize: number = 3;
  collectionSize: number = 50;
  sort = "d"
  reviews: Review[] = []
  login: boolean = false

  ratingFilter: string = "all"
  fivestar: number = 0
  fourstar: number = 0
  threestar: number = 0
  twostar: number = 0
  onestar: number = 0
  totalRating: number = 0
  avgRating:number = 0
  review: string = ""
  rating!: number

  id: number = 0
  constructor(private productService: ProductService,
    private route: ActivatedRoute, private loginService: LoginService, private cartService: CartService,
    private modalService: NgbModal, private toast: HotToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.login = this.loginService.isLogin
    this.getInfo(this.id)
  }
  getInfo(id: number) {
    // this.productService.getProduct(id).subscribe(
    //   data => {

    //     this.product = data
    //     this.nextId = Number(this.product.id) + 1
    //     this.prevId = Number(this.product.id) - 1
    //   }
    // )
    // this.productService.getProductReview(this.pageNumber, this.pageSize, id, this.sort, this.ratingFilter).subscribe(
    //   data => {
    //     this.reviews = data.content
    //     this.collectionSize = data.totalElements;
    //     this.pageNumber = data.number
    //     this.pageSize = data.size
    //   }
    // )
    // this.productService.getProductRating(this.id).subscribe(
    //   data => {
    //     this.fivestar=data.fivestar
    //     this.fourstar=data.fourstar
    //     this.threestar=data.threestar
    //     this.twostar=data.twostar
    //     this.onestar=data.onestar
    //     this.totalRating=this.fivestar+this.fourstar+this.threestar+this.twostar+this.onestar
    //   }
    // )
    this.route.paramMap.subscribe(params => {
      this.id = Number(this.route.snapshot.paramMap.get("id"));
      this.productService.getProduct(this.id).subscribe(
        data => {

          this.product = data
          this.nextId = Number(this.product.id) + 1
          this.prevId = Number(this.product.id) - 1
        }
      )
      this.updateInfo();
    })
  }

  private updateInfo() {
    this.productService.getProductReview(this.pageNumber, this.pageSize, this.id, this.sort, this.ratingFilter).subscribe(
      data => {
        this.reviews = data.content;
        this.collectionSize = data.totalElements;
      }
    );
    this.productService.getProductRating(this.id).subscribe(
      data => {
        this.fivestar = data.fivestar;
        this.fourstar = data.fourstar;
        this.threestar = data.threestar;
        this.twostar = data.twostar;
        this.onestar = data.onestar;
        this.totalRating = this.fivestar + this.fourstar + this.threestar + this.twostar + this.onestar;
        this.avgRating = (this.fivestar*5+this.fourstar*4+this.threestar*3+this.twostar*2+this.onestar)/this.totalRating
      }
    );
    this.resetReview()
  }

  next() {
    this.router.navigateByUrl(`/products/${this.nextId}`)
    this.getInfo(this.nextId)
  }
  prev() {
    this.router.navigateByUrl(`/products/${this.prevId}`)
    this.getInfo(this.prevId)
  }
  addToCart(pro: Product) {
    this.cartService.addToCart(pro)
    this.toast.success("Add product to cart successfully!")
  }
  addToFav(pro: Product) {
    if (this.loginService.isLogin) {
      this.productService.addToFav(this.loginService.user.id, pro.id).subscribe(
        data => {
          this.toast.success(data.mess)
        },
        error => {
          this.toast.error("Something gone wrong! Try again.")
          console.log(error)
        }
      )

    }
    else {
      this.toast.show("Login to add this product to your favorite list!")
    }
  }


  getPage() {
    this.productService.getProductReview(this.pageNumber, this.pageSize, this.id, this.sort, this.ratingFilter).subscribe(
      data => {
        this.reviews = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
  getNewPage() {
    this.pageNumber = 1
    this.productService.getProductReview(this.pageNumber, this.pageSize, this.id, this.sort, this.ratingFilter).subscribe(
      data => {
        this.reviews = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }

  addReview(pro: Product) {
    if (this.rating == undefined) {
      this.toast.error("You haven't rate this product yet!")
    }
    else {
      if (this.review.trim().length == 0) {
        this.toast.error("Review can't be empty!")
      }
      else {
        let r: Review = new Review
        r.user = this.loginService.user
        r.user.password = ""
        r.product = pro
        r.date = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
        r.content = this.review
        r.star = this.rating
        this.productService.createReview(r).subscribe(
          data => {
           this.updateInfo()
          }
        )
        this.toast.success("Review posted!")
        this.resetReview()
      }
    }
  }
  resetReview(){
    this.review=""
    this.rating!=undefined
  }

}
