import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Product } from 'src/app/class/product';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Observable<Product[]>;
  content!: Product[];
  pageNumber: number = 1;
  pageSize: number = 8;
  collectionSize: number = 0;
  category: string = "all"
  searchMode: boolean = false;
  searchCount: number = 0
  constructor(private productService: ProductService,
    private cartService: CartService, private loginService: LoginService,
    private modalService: NgbModal, private toast: HotToastService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.searchMode = false;
    let cate = this.route.snapshot.paramMap.get("category");
    if (cate != null) {
      this.category = cate
    }
    this.productService.getPage(this.pageNumber, this.pageSize, this.category).subscribe(
      data => {
        this.content = data.content;
        this.collectionSize = data.totalElements;
        this.pageNumber = data.number
        this.pageSize = data.size
      }
    )
    this.route.paramMap.subscribe(params => {
      let cate = params.get("category");
      console.log(cate)
      if (cate != null) {
        this.category = cate
      }
      this.pageNumber=1
      this.productService.getPage(this.pageNumber, this.pageSize, this.category).subscribe(
        data => {
          this.content = data.content;
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
        }
      )
    })
  }
  getPage() {
    this.productService.getPage(this.pageNumber, this.pageSize, this.category).subscribe(
      data => {
        this.content = data.content;
        this.collectionSize = data.totalElements;
      }
    )
  }

  switchCate(cate: string) {
    this.pageNumber = 1;
    this.pageSize = 8;
    this.category = cate;
    this.productService.getPage(this.pageNumber, this.pageSize, this.category).subscribe(
      data => {
        this.content = data.content;
        this.collectionSize = data.totalElements;
      }
    )
  }

  getSearchResult(keyword: string) {
    this.searchMode = true;

    this.productService.getSearchResult(keyword).subscribe(
      data => {
        this.content = data.content;
        this.searchCount = data.totalElements;
      }
    )
  }

  backToProduct() {
    this.getData();
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
}
