import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { LoginComponent } from './component/login/login.component';
import { NavComponent } from './component/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { ProductInfoComponent } from './component/product-info/product-info.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AccountInfoComponent } from './component/account-info/account-info.component';
import { AccountNewpasswordComponent } from './component/account-newpassword/account-newpassword.component';
import { AccountOrderinfoComponent } from './component/account-orderinfo/account-orderinfo.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { AccountOrderlistComponent } from './component/account-orderlist/account-orderlist.component';
import { AdministratorComponent } from './component/administrator/administrator.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdministratorProductComponent } from './component/administrator-product/administrator-product.component';
import { AdministratorOrderComponent } from './component/administrator-order/administrator-order.component';
import { AdministratorUserComponent } from './component/administrator-user/administrator-user.component';
import { AdministratorStatisticalComponent } from './component/administrator-statistical/administrator-statistical.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ShipperComponent } from './component/shipper/shipper.component';
import { ShipperAcceptedOrderComponent } from './component/shipper-accepted-order/shipper-accepted-order.component';
import { ShipperOrderHistoryComponent } from './component/shipper-order-history/shipper-order-history.component';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { AboutComponent } from './component/about/about.component';
import { SlideHomeComponent } from './component/slide-home/slide-home.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart-detail', component: CartDetailComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'account-newpassword', component: AccountNewpasswordComponent },
  { path: 'account-orderlist/:id', component: AccountOrderinfoComponent },
  { path: 'account-orderlist', component: AccountOrderlistComponent },
  { path: 'Administrator-Statistical', component: AdministratorStatisticalComponent },
  { path: 'Administrator-User', component: AdministratorUserComponent },
  { path: 'Administrator-Order', component: AdministratorOrderComponent },
  { path: 'Administrator-Product', component: AdministratorProductComponent },
  { path: 'Administrator', component: AdministratorComponent },
  { path: 'Shipper', component: ShipperComponent },
  { path: 'Shipper-Accepted', component: ShipperAcceptedOrderComponent },
  { path: 'Shiper-History', component: ShipperOrderHistoryComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products/:id', component: ProductInfoComponent },
  { path: 'products/category/:category', component: ProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  {path: '**', redirectTo: '/error', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    NavComponent,
    CartStatusComponent,
    CartDetailComponent,
    ProductInfoComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AccountInfoComponent,
    AccountNewpasswordComponent,
    AccountOrderinfoComponent,
    CheckoutComponent,
    AccountOrderlistComponent,
    AdministratorComponent,
    FooterComponent,
    AdministratorProductComponent,
    AdministratorOrderComponent,
    AdministratorUserComponent,
    AdministratorStatisticalComponent,
    ShipperComponent,
    ShipperAcceptedOrderComponent,
    ShipperOrderHistoryComponent,
    HomeComponent,
    ProductComponent,
    AboutComponent,
    SlideHomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule, NgbModule, HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
