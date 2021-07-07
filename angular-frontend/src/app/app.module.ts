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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart-detail', component: CartDetailComponent},
  { path: 'home', component: ProductListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'account-newpassword', component: AccountNewpasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products/:id', component: ProductInfoComponent },
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
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
