import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/class/product';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-administrator-product',
  templateUrl: './administrator-product.component.html',
  styleUrls: ['./administrator-product.component.css']
})
export class AdministratorProductComponent implements OnInit {
  user: User = new User()
  closeResult = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;
  category: string = "all"
  orderby: string = "id"

  imgURL: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
  dataRegister:any={}
  products: Product[] = []

  constructor(private loginService: LoginService,
    private adminService: AdminService, private http: HttpClient,
    private router: Router, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLogin()
  }
  isLogin() {
    if (this.loginService.isLogin == false) {
      this.router.navigateByUrl("/login")
    }
    else {
      this.user = this.loginService.user
      if (this.user.role != 'admin') {
        this.router.navigateByUrl("/home")
      }
      this.adminService.getProducrForAdmin(this.pageNumber, this.pageSize, this.category, this.orderby).subscribe(
        data => {
          this.products = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
        }
      )
    }
  }

  getPage() {
    this.adminService.getProducrForAdmin(this.pageNumber, this.pageSize, this.category, this.orderby).subscribe(
      data => {
        this.products = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
  getNewPage() {
    this.pageNumber = 1
    this.adminService.getProducrForAdmin(this.pageNumber, this.pageSize, this.category, this.orderby).subscribe(
      data => {
        this.products = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  create_blob(file: Blob, callback: (arg0: string | ArrayBuffer | null) => void) {
    var reader = new FileReader();
    reader.onload = function () { callback(reader.result) };
    reader.readAsDataURL(file);
  }

  uploadImage(event: any) {
    var that = this;
    this.create_blob(event.srcElement.files[0], function (blob_string) {
      that.http.post('https://api.cloudinary.com/v1_1/dkmk9tdwx/image/upload', { file: blob_string ,upload_preset:'v0q5hczm'}).subscribe(res => {
        that.dataRegister=res
        that.imgURL=that.dataRegister.url
        console.log(that.imgURL)
      })
    })
  }
}
