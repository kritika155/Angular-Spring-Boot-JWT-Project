import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule}    from '@angular/forms';
// import { HttpInterceptorService } from './service/httpInterceptor.service';
import { DialogService } from './service/dialog.service';
import { TokenInterceptor } from './authentication/interceptors/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ErrorInterceptor} from './authentication/interceptors/error.interceptor';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductViewComponent } from './product-view/product-view.component'
import { ProductService } from './service/product.service';
import { GreetingService } from './service/greeting.service';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    NotFoundComponent,
    ContactComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi: true},
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
   DialogService ,
   ProductService,
   GreetingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
