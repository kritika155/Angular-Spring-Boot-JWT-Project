import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RoleGuard } from './authentication/guards/role.guard';
import { ROLE } from './role.enum';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { CountryEditCanDeactivateGuard } from './authentication/guards/country-edit-can-deactivate-guard.service.service';
import { CanDeactivateGuard } from './authentication/guards/can-deactivate-guard.service.service';
const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
	// { path: 'home', component: HomeComponent },
	// { path: 'signin', component: SigninComponent },
	// { path: 'signup', component: SignupComponent },
 { path: 'product', component: ProductComponent,canActivateChild: [AuthenticationGuard],data: {expectedRole: ROLE.ADMIN},
  children: [
  {  path: 'view/:id', component: ProductViewComponent },
  {  path: 'edit/:id', component: ProductEditComponent,	canDeactivate: [CountryEditCanDeactivateGuard]  },
  {  path: 'add', component: ProductAddComponent,canDeactivate:[CanDeactivateGuard] }
  ]},
  { path: 'contact', component: ContactComponent },
  {path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin', component: AdminDashboardComponent, 
  canActivate: [AuthenticationGuard, RoleGuard], data: {expectedRole: ROLE.ADMIN},
children:[
  { path: 'product', component: ProductComponent
}]
},
  {path: 'user', component: UserDashboardComponent, canActivate: [AuthenticationGuard, RoleGuard], 
  data: {expectedRole: ROLE.USER},children:[
    { path: 'product', component: ProductComponent
  }]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 
    CanDeactivateGuard,
    CountryEditCanDeactivateGuard,
],
})
export class AppRoutingModule { }
