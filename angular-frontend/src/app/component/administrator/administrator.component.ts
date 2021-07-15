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
  time:NgbTimeStruct = {hour: 13, minute: 30,second:0};
  meridian = true;

  eventName: string = ""
  eventDes: string = ""
  isSelected: boolean = false
  todayString: string = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
  numberOfDay: number = 30
  endDay: string = ""
  eventList: Event[] = []


  
  pageNumber: number = 1;
  pageSize: number = 5;
  collectionSize: number = 50;


  constructor(private loginService: LoginService,
    private adminService: AdminService,
    private router: Router, private calendar: NgbCalendar,
    private modalService: NgbModal, private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.isLogin()
    

  }
  getEventByDate(){
    let date = new Date();
    // add a day
    date.setDate(date.getDate() + this.numberOfDay);
    this.endDay = formatDate(date,'yyyy-MM-dd','en')
    this.adminService.getEventForAdmin(this.user.id,this.todayString,this.endDay).subscribe(
      data => {
        this.eventList = data
        this.collectionSize = data.totalElements;
        this.pageNumber = data.number
        this.pageSize = data.size
      },
      error => {
        console.log(error)
      }
    )
  }
  getNewEventByDate(){
    let date = new Date();
    // add a day
    date.setDate(date.getDate() + this.numberOfDay);
    this.endDay = formatDate(date,'yyyy-MM-dd','en')
    this.adminService.getEventForAdmin(this.user.id,this.todayString,this.endDay).subscribe(
      data => {
        this.eventList = data
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
    }
  }
  selectToday() {
    this.dateModel = this.calendar.getToday();
  }

  openAddEventModal(modal: any) {
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
    e.time=this.toTimeString(this.time)
    
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

  toDateString(date: NgbDateStruct): string // from internal model -> your mode
  {
    return date ? date.year + "-" + ('0' + date.month).slice(-2)
      + "-" + ('0' + date.day).slice(-2) : ""
  }
  toTimeString(time:NgbTimeStruct):string{
    let stringTime=""
    if(time.hour>12){
      return "0"+(time.hour-12)+":"+time.minute+":"+"00"+" PM"
    }
    else{
      return time.hour+":"+time.minute+":"+"00"+" AM"
    } 
  }
}
