import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/class/user';
import { Event } from 'src/app/class/event';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  user: User = new User()

  dateModel!: NgbDateStruct;
  date!: { year: number, month: number };
  time: NgbTimeStruct =  { hour: 0, minute: 0, second: 0 }
  meridian = true;

  eventName: string = ""
  eventDes: string = ""
  isSelected: boolean = false
  todayString: string = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
  numberOfDay: number = 7
  endDay: string = ""
  eventList: Event[] = []



  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;
  dbInfo:any={}

  constructor(private loginService: LoginService,
    private adminService: AdminService,
    private router: Router, private calendar: NgbCalendar,
    private modalService: NgbModal, private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.isLogin()


  }
  getEventByDate() {
    let date =new Date(new Date().getTime()+(this.numberOfDay*24*60*60*1000));
    this.endDay = formatDate(date, 'yyyy-MM-dd', 'en')
    this.adminService.getEventForAdmin(this.user.id, this.todayString, this.endDay, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.eventList = data.content
        this.collectionSize = data.totalElements;
      },
      error => {
        console.log(error)
      }
    )
  }
  getNewEventByDate() {
    this.pageNumber = 1
    let date =new Date(new Date().getTime()+(this.numberOfDay*24*60*60*1000));
    this.endDay = formatDate(date, 'yyyy-MM-dd', 'en')
    this.adminService.getEventForAdmin(this.user.id, this.todayString, this.endDay, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.eventList = data.content
        this.collectionSize = data.totalElements;
      },
      error => {
        console.log(error)
      }
    )
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
      this.getEventByDate()
      this.adminService.getDBInfo().subscribe(
        data=>{
          this.dbInfo=data
        }
      )
    }
  }
  selectToday() {
    this.dateModel = this.calendar.getToday();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
  openAddEventModal(modal: any) {
    this.clearInput()
    if (this.dateModel == undefined) {
      this.toast.error("Select a day to add event!")
    }
    else {
      this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' })
    }

  }
  saveEvent() {


    let e: Event = new Event
    let stringDate = this.toDateString(this.dateModel)
    console.log(stringDate)
    console.log(this.toTimeString(this.time))
    e.description = this.eventDes
    e.date = stringDate
    e.user = this.user
    e.user.password = ""
    e.time = this.toTimeString(this.time)

    console.log(e)
    this.adminService.createEvent(e).subscribe(
      data => {
        console.log(data)
        this.toast.success("Save complete!")
      },
      error => {
        console.log(error)
        this.toast.error("An error has occurred. Please try again!")
      }
    )
    this.modalService.dismissAll()
  }

  toDateString(date: NgbDateStruct): string 
  {
    return date ? date.year + "-" + ('0' + date.month).slice(-2)
      + "-" + ('0' + date.day).slice(-2) : ""
  }
  toTimeString(time: NgbTimeStruct): string {
    let stringTime = ""
    let h:string =""
    let m:string =""
    if (time.hour > 12) {
      return  this.convertTime((time.hour - 12)) + ":" + this.convertTime(time.minute) + ":" + "00" + " PM"
    }
    else {
      return this.convertTime((time.hour )) + ":" + this.convertTime(time.minute) + ":" + "00" + " AM"
    }
  }
  convertTime(num:number):string{
    if (num >= 10) {
      return String(num);
    } else {
      return "0" + String(num);
    }
  }

  clearInput(){
    this.eventDes = ""
    this.time= { hour: 0, minute: 0, second: 0 }
  }
}
