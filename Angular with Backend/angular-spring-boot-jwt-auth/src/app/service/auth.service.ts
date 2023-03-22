import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from '../model/request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../model/user.model";
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user!:User;
	private baseUrl = 'http://localhost:8080/';

	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

	signin(request: Request): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signin', request, 
		{headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
			
			sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
			console.log("Response from signin:",resp);
			this.user={
				username:request.userName,
				password:request.userPwd,
				token:resp.token,
				roles:resp.roles
			}
			sessionStorage.setItem('user', JSON.stringify(this.user));
			return this.user;
		}));
	}

	signup(request: Request): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {                                                         
			return resp;
		}));
	}

	signout() {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');

		this.router.navigateByUrl('signin');
	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
	}

	getSignedinUser() {
		return sessionStorage.getItem('user') as string;
	}

	getToken() {
		let token = sessionStorage.getItem('token') as string;
		return token;
	}

}
