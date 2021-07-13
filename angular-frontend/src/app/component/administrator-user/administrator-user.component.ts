import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-administrator-user',
  templateUrl: './administrator-user.component.html',
  styleUrls: ['./administrator-user.component.css']
})
export class AdministratorUserComponent implements OnInit {
  user: User = new User()

  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;
  role: string = "all"
  orderby: string = "id"

  id!: number
  uname: string = ""
  pass: string = ""
  urole: string = "customer"
  name: string = ""
  phone: string = ""
  email: string = ""
  status: number = 1

  unameError: boolean = false
  passError: boolean = false
  nameError: boolean = false
  phoneError: boolean = false
  emailError: boolean = false
  imgError: boolean = false
  regexp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  isUpload: boolean = false
  imgURL: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
  dataRegister: any = {}
  usersList: User[] = []

  constructor(private loginService: LoginService,
    private adminService: AdminService, private http: HttpClient,
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
      this.adminService.getUserForAdmin(this.pageNumber, this.pageSize, this.role, this.orderby).subscribe(
        data => {
          this.usersList = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
        }
      )
    }
  }

  getPage() {
    this.adminService.getUserForAdmin(this.pageNumber, this.pageSize, this.role, this.orderby).subscribe(
      data => {
        this.usersList = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }
  getNewPage() {
    this.pageNumber = 1
    this.adminService.getUserForAdmin(this.pageNumber, this.pageSize, this.role, this.orderby).subscribe(
      data => {
        this.usersList = data.content
        this.collectionSize = data.totalElements;
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
  create_blob(file: Blob, callback: (arg0: string | ArrayBuffer | null) => void) {
    var reader = new FileReader();
    reader.onload = function () { callback(reader.result) };
    reader.readAsDataURL(file);
  }

  uploadImage(event: any) {
    var that = this;
    this.isUpload = true;
    this.create_blob(event.srcElement.files[0], function (blob_string) {
      that.http.post('https://api.cloudinary.com/v1_1/dkmk9tdwx/image/upload', { file: blob_string, upload_preset: 'v0q5hczm' }).subscribe(res => {
        that.dataRegister = res
        that.imgURL = that.dataRegister.url
        console.log(that.imgURL)
        that.imgError = false
        that.isUpload = false
      },
        error => {
          console.log(error)
          that.imgError = true
        })
    })
  }

  openAddModal(add_user: any) {
    this.resetInput()
    this.modalService.open(add_user, { ariaLabelledBy: 'modal-basic-title' })
  }
  async saveUser() {
    const response = await this.validateInput()
    if (response) {
      let newUser = new User
      newUser.name = this.name
      newUser.username = this.uname
      newUser.password = this.pass
      newUser.email = this.email
      newUser.phone = this.phone
      newUser.imgUrl = this.imgURL
      newUser.role = this.urole
      newUser.status = 1
      this.modalService.dismissAll()
      this.adminService.createUser(newUser).subscribe(
        data => {
          this.toast.success("Save complete!")
          this.getPage()
        },
        error => {
          this.toast.error("An error has occurred. Please try again!")
        }
      )
    }
    else {
      this.toast.error("User info not valid!")
    }

  }

  openEditModal(user_edit: any, u: User) {
    this.resetInput()
    this.modalService.open(user_edit, { ariaLabelledBy: 'modal-basic-title' })
    this.id = u.id
    this.uname = u.username
    this.urole = u.role
    this.name = u.name
    this.phone = u.phone
    this.email = u.email
    this.imgURL = u.imgUrl
    this.status = u.status
  }
  async editUser() {
    const response = await this.validateEditInput()
    if (response) {
      let newUser = new User
      newUser.id = this.id
      newUser.name = this.name
      newUser.username = this.uname
      newUser.password = this.pass
      newUser.email = this.email
      newUser.phone = this.phone
      newUser.imgUrl = this.imgURL
      newUser.role = this.urole
      newUser.status = this.status
      this.adminService.updateUser(newUser).subscribe(
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
  }

  openDeleteModal(user_delete: any, u: User) {
    this.id = u.id
    this.uname = u.username
    this.urole = u.role
    this.name = u.name
    this.phone = u.phone
    this.email = u.email
    this.imgURL = u.imgUrl
    this.status = u.status
    this.modalService.open(user_delete, { ariaLabelledBy: 'modal-basic-title' })
  }
  deleteUser() {
    this.modalService.dismissAll()
    this.adminService.deleteUser(this.id).subscribe(
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

  async validateInput(): Promise<boolean> {
    this.unameError = false;
    this.passError = false;
    this.nameError = false;
    this.phoneError = false;
    this.emailError = false;

    if (this.uname.trim().length == 0) {
      this.unameError = true
    }
    else {
      const response = await this.loginService.checkIfUsernameExist(this.uname).toPromise();
      this.unameError = response.success
    }

    if (this.pass.trim().length == 0) {
      this.passError = true;
    }
    else if (this.pass.length < 8) {
      this.passError = true;
    }

    if (this.name.trim().length == 0) {
      this.nameError = true;
    }

    if (this.phone.trim().length == 0) {
      this.phoneError = true;
    }

    if (this.email.trim().length == 0) {
      this.emailError = true;
    }

    if (!this.regexp.test(this.email)) {
      this.emailError = true
    }
    else {
      const response = await this.loginService.checkIfEmailExist(this.email).toPromise();
      this.emailError = response.success
    }




    let errorList: boolean[] = [];
    errorList.push(this.unameError)
    errorList.push(this.passError)
    errorList.push(this.nameError)
    errorList.push(this.emailError)
    errorList.push(this.phoneError)

    for (let i = 0; i < errorList.length; i++) {
      if (errorList[i] == true) {
        return false
      }
    }
    return true
  }

  async validateEditInput(): Promise<boolean> {
    this.unameError = false;
    this.passError = false;
    this.nameError = false;
    this.phoneError = false;
    this.emailError = false;

    if (this.name.trim().length == 0) {
      this.nameError = true;
    }

    if (this.phone.trim().length == 0) {
      this.phoneError = true;
    }

    let errorList: boolean[] = [];

    errorList.push(this.nameError)
    errorList.push(this.phoneError)

    for (let i = 0; i < errorList.length; i++) {
      if (errorList[i] == true) {
        return false
      }
    }
    return true
  }

  resetInput() {
    this.uname = ""
    this.pass = ""
    this.urole = "customer"
    this.name = ""
    this.phone = ""
    this.email = ""
    this.imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
    this.status = 1


    this.unameError = false;
    this.passError = false;
    this.nameError = false;
    this.phoneError = false;
    this.emailError = false;

  }
}
