import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { OrderBill } from 'src/app/class/order-bill';
import { OrderDetail } from 'src/app/class/order-detail';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';
import { ShipperService } from 'src/app/service/shipper.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {
  
  user: User = new User()
  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;
  status: number = 2
  orderby: string = "id"
  sortDirect: string = "a"
  orders: OrderBill[] = []
  orderDetails: OrderDetail[]=[]
  selectedStatus!: number
  selectedId!:number
  selectedTotalItem!:number
  selectedTotalPrice!:number
  selectedNote!:string
  
  constructor(private loginService: LoginService,
    private adminService: AdminService, private http: HttpClient,private shipperService:ShipperService,
    private router: Router, private modalService: NgbModal,private toast: HotToastService) { }

  ngOnInit(): void {
    this.isLogin()
  }
  isLogin(){
    if (this.loginService.isLogin == false) {
      this.router.navigateByUrl("/login")
    }
    else {
      this.user = this.loginService.user
      if (this.user.role != 'shipper') {
        this.router.navigateByUrl("/home")
      }
      this.adminService.getOrderForAdmin(this.pageNumber, this.pageSize, this.status, this.orderby, this.sortDirect).subscribe(
        data => {
          this.orders = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
        }
      )
    }
  }
  
  getPage() {
    this.adminService.getOrderForAdmin(this.pageNumber, this.pageSize, this.status, this.orderby, this.sortDirect).subscribe(
      data => {
        this.orders = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
  getNewPage() {
    this.pageNumber = 1
    this.adminService.getOrderForAdmin(this.pageNumber, this.pageSize, this.status, this.orderby, this.sortDirect).subscribe(
      data => {
        this.orders = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
  acceptOrder(bill_id:number){
    this.shipperService.acceptOrder(this.user.id,bill_id).subscribe(
      data=>{
        this.toast.success("Successfully accept this order!")
        this.getPage()
      },
      error=>{


        this.toast.error("An error has occurred. Please try again!")
      }
    )
  }
  openInfoModal(order_info:any,u:OrderBill){
    this.modalService.open(order_info, { ariaLabelledBy: 'modal-basic-title' })
    this.selectedId=u.id
    this.selectedTotalItem=u.totalItem
    this.selectedTotalPrice=u.totalPrice
    this.selectedNote=u.note
    this.adminService.getOrderDetail(this.selectedId).subscribe(
      data=>{
        this.orderDetails=data.content
        console.log(this.orderDetails)
      }
    )
  }

}
