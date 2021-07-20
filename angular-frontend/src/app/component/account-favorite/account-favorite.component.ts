import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { FavoriteProduct } from 'src/app/class/favorite-product';
import { User } from 'src/app/class/user';
import { AccountService } from 'src/app/service/account.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-account-favorite',
  templateUrl: './account-favorite.component.html',
  styleUrls: ['./account-favorite.component.css']
})
export class AccountFavoriteComponent implements OnInit {
  user: User = new User()
  pageNumber: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0;
  fav: FavoriteProduct[] = []
  constructor(private loginService: LoginService,
    private accountService: AccountService,private modalService: NgbModal, private toast: HotToastService,
    private route: Router) { }

  ngOnInit(): void {
    this.isLogin()
  }


  isLogin() {
    if (this.loginService.isLogin == false) {
      this.route.navigateByUrl("/login")
    }
    else {
      this.user = this.loginService.user
      this.accountService.getUserFavoriteItem(this.user.id, this.pageNumber, this.pageSize).subscribe(
        data => {
          this.fav = data.content
          this.collectionSize = data.totalElements;
          this.pageNumber = data.number
          this.pageSize = data.size
         // console.log(this.fav)
        }
      )
    }
  }
  getPage(){
    this.accountService.getUserFavoriteItem(this.user.id, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.fav = data.content
        this.collectionSize = data.totalElements;
      }
    )
  }

  removeFromFav(fav:FavoriteProduct){
    this.accountService.deleteFromFav(fav.id).subscribe(
      data=>{
        this.toast.success("Remove item successfully!")
        this.getPage()
      },
      error=>{
        this.toast.error("Something gone wrong. Try again!")
        console.log(error)
      }
      
    )
  }
}
