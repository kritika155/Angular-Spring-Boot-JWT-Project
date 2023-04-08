import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor (private authService:AuthService, 
    private router:Router) {
}
  logout() {
    this.authService.signout();
  }
  doSignout() {
		this.authService.signout();
	}
}
