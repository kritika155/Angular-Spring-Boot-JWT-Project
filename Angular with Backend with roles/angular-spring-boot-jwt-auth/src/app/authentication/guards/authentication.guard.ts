import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  currentUser!:User;
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authenticationService.isUserSignedin();
        console.log("Signed in from can activate:",currentUser);
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean|UrlTree {
      // if (!this.authenticationService.isAdminUser()) {
      //   alert('You are not allowed to view this page');
      //   return false;
      // }
      let role:any;
      this.currentUser = JSON.parse(this.authenticationService.getSignedinUser());
      console.log("currentUser:",this.currentUser)
      const expectedRole = route.data['expectedRole'];
      console.log("Role:",this.currentUser.roles);
      // if (this.currentUser.roles!==expectedRole) {
      //   alert('You are not allowed to view this page');
      //     return false;
      // }
      if (this.currentUser.roles == 'ROLE_ADMIN') {
        return true;		
    } else {
      console.log('Unauthorized to open link: '+ state.url);
      alert('Admin role is required');
      return false;
    }
}
}
