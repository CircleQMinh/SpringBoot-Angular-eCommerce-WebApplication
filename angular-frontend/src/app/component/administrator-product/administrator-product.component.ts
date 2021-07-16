import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
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



  id!:string;
  name: string = "";
  price: string = '10.00';
  description: string = "Product Description ...";
  unitsInStock: string='50';
  procategory: string="Fruit";
  lastUpdate!: string;
  imgURL: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"


  regexpNDOnly = new RegExp("^[0-9]*\.?[0-9]*$");

  dataRegister: any = {}
  products: Product[] = []

  nameError:boolean=false
  priceError:boolean=false
  imgError:boolean=false
  unitError:boolean=false
  desError:boolean=false

  isUpload:boolean=false




  constructor(private loginService: LoginService,
    private adminService: AdminService, private http: HttpClient,
    private router: Router, private modalService: NgbModal,private toast: HotToastService
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
    this.resetInput()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  create_blob(file: Blob, callback: (arg0: string | ArrayBuffer | null) => void) {
    var reader = new FileReader();
    reader.onload = function () { callback(reader.result) };
    reader.readAsDataURL(file);
  }

  uploadImage(event: any) {
    var that = this;
    this.isUpload=true;
    this.create_blob(event.srcElement.files[0], function (blob_string) {
      that.http.post('https://api.cloudinary.com/v1_1/dkmk9tdwx/image/upload', { file: blob_string, upload_preset: 'v0q5hczm' }).subscribe(res => {
        that.dataRegister = res
        that.imgURL = that.dataRegister.url
        console.log(that.imgURL)
        that.imgError=false
        that.isUpload=false
      },
      error =>{
        console.log(error)
        that.imgError=true
      })
    })
  }

  saveProduct() {
    if(this.validateInput()){
      this.lastUpdate = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss', 'en');
      let newPro = new Product(null!, this.name, Number(this.price), this.description, Number(this.unitsInStock), this.procategory, this.imgURL, this.lastUpdate)    
      this.modalService.dismissAll()
      this.adminService.createProduct(newPro).subscribe(
        data=>{
          this.toast.success("Save complete!")
          this.getPage()
        },
        error=>{
          this.toast.error("An error has occurred. Please try again!")
        }
      )
      
    }
 

  }
  openEditModal(product_edit:any,product:Product){
    this.resetInput()
    this.modalService.open(product_edit, { ariaLabelledBy: 'modal-basic-title' })
    this.id=String(product.id)
    this.name=product.name
    this.price=String(product.price)
    this.procategory=product.category
    this.description=product.description
    this.unitsInStock=String(product.unitsInStock)
    this.lastUpdate=product.lastUpdate
    this.imgURL=product.imgUrl
  }
  editProduct() {
    if(this.validateInput()){
      this.lastUpdate = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss', 'en');
      let newPro = new Product(Number(this.id), this.name, Number(this.price), this.description, Number(this.unitsInStock), this.procategory, this.imgURL, this.lastUpdate) 

      
      this.adminService.updateProduct(newPro).subscribe(
        data=>{
          this.toast.success("Update complete!")
          this.getPage()
        },
        error=>{
          this.toast.error("An error has occurred. Please try again!")
        }
      )
      this.modalService.dismissAll()
    }

  }
  openDeleteModal(product_delete:any,product:Product){
    this.modalService.open(product_delete, { ariaLabelledBy: 'modal-basic-title' })
    this.id=String(product.id)
    this.name=product.name
    this.price=String(product.price)
    this.procategory=product.category
    this.description=product.description
    this.unitsInStock=String(product.unitsInStock)
    this.lastUpdate=product.lastUpdate
    this.imgURL=product.imgUrl
  }
  deleteProduct() {
    let newPro = new Product(Number(this.id), this.name, Number(this.price), this.description, Number(this.unitsInStock), this.procategory, this.imgURL, this.lastUpdate) 
    this.modalService.dismissAll()
    console.log(newPro)
    this.adminService.deleteProduct(newPro.id).subscribe(
      data=>{
        this.toast.success("Delete complete!")
        this.getPage()
      },
      error=>{
        console.log(error)
        this.toast.error("An error has occurred. Please try again!")
      }
    )
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  validateInput():boolean{

    this.nameError=false
    this.priceError=false
    this.unitError=false
    this.desError=false

    if(this.name.trim().length==0){
      this.nameError=true
    }
    if(!this.regexpNDOnly.test(this.price)){
      this.priceError=true
    }
    if(this.unitsInStock.trim().length==0){
      this.unitError=true
    }
    if(this.description.trim().length==0){
      this.desError=true
    }

    let errorList:boolean[]=[]
    errorList.push(this.nameError,this.priceError,this.unitError,this.desError)
    for(let i=0;i<errorList.length;i++){
      if(errorList[i]){
        return false
      }
    }
    return true
  }

  resetInput(){
    this.name  = "";
    this.price  = '10.00';
    this. description  = "Product Description ...";
    this. unitsInStock ='50';
    this. procategory ="Fruit";
    this. lastUpdate! ;
    this. imgURL  = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
  
    this.nameError=false
    this.priceError=false
    this.unitError=false
    this.desError=false
  
  }
}
