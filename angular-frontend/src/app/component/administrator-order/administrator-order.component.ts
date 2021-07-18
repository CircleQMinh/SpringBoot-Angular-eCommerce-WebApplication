import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { OrderBill } from 'src/app/class/order-bill';
import { OrderDetail } from 'src/app/class/order-detail';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-administrator-order',
  templateUrl: './administrator-order.component.html',
  styleUrls: ['./administrator-order.component.css']
})
export class AdministratorOrderComponent implements OnInit {

  user: User = new User()

  orders: OrderBill[] = []
  orderDetails: OrderDetail[]=[]


  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;
  status: number = 0
  orderby: string = "id"
  sortDirect: string = "a"

  selectedStatus!: number
  selectedId!:number
  selectedTotalItem!:number
  selectedTotalPrice!:number
  selectedNote!:string


  constructor(private loginService: LoginService,
    private adminService: AdminService,
    private router: Router, private modalService: NgbModal, private toast: HotToastService
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
  openEditModal(order_edit: any, u: OrderBill) {
    this.modalService.open(order_edit, { ariaLabelledBy: 'modal-basic-title' })

    this.selectedStatus = u.status
    this.selectedId=u.id

  }
  editOrder() {
    let o:OrderBill = new OrderBill
    o.id=this.selectedId
    o.status=this.selectedStatus
    o.note=this.selectedNote
    this.adminService.updateOrder(o).subscribe(
      data => {
        this.toast.success("Update complete!")
        this.getPage()
      },
      error => {
        this.toast.error("An error has occurred. Please try again!")
      }
    )
    this.modalService.dismissAll()
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

  openDeleteModal(order_delete:any,u:OrderBill){
    this.selectedId=u.id
    this.modalService.open(order_delete, { ariaLabelledBy: 'modal-basic-title' })
  }
  deleteOrder(){
    this.modalService.dismissAll()
    this.adminService.deleteOrder(this.selectedId).subscribe(
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
}
