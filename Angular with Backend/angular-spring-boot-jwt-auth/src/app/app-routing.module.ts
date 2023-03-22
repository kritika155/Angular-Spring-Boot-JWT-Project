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
const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
	// { path: 'home', component: HomeComponent },
	// { path: 'signin', component: SigninComponent },
	// { path: 'signup', component: SignupComponent },
  {path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin', component: AdminDashboardComponent, 
  canActivate: [AuthenticationGuard, RoleGuard], data: {expectedRole: ROLE.ADMIN}},
  {path: 'user', component: UserDashboardComponent, canActivate: [AuthenticationGuard, RoleGuard], 
  data: {expectedRole: ROLE.USER}},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
