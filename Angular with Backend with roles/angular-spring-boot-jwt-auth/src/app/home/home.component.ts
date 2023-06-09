import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { GreetingService } from '../service/greeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../model/user.model";
@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	isSignedin = false;

	signedinUser!: User ;

	greeting: any[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService, private greetingService: GreetingService) {}

	ngOnInit() {
		this.isSignedin = this.authService.isUserSignedin();
		this.signedinUser = JSON.parse(this.authService.getSignedinUser());
		console.log("Greetings:",this.greeting);

		if(!this.authService.isUserSignedin()) {
			this.router.navigateByUrl('signin');
		}

		if(this.isSignedin) {
			this.greetingService.getByUserRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/user - You are not authorize'));
			this.greetingService.getByAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/admin - You are not authorized'));
			this.greetingService.getByUserOrAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/userOrAdmin - You are not authorized'));
			this.greetingService.getByAnonymousRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/anonymous - You are not authorized'));
		console.log("Greetings:",this.greeting);
		}
	}

	doSignout() {
		this.authService.signout();
	}

}
