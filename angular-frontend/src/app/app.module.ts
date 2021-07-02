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

const routes: Routes = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  {path: '**', redirectTo: '/error', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    NavComponent
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
