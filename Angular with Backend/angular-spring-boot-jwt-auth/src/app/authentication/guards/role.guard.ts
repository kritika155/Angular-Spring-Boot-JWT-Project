import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from "src/app/model/user.model";
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    currentUser!:User;
      constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.currentUser = JSON.parse(this.authenticationService.getSignedinUser());
        console.log("currentUser:",this.currentUser)
        const expectedRole = route.data['expectedRole'];
        console.log("Role:",this.currentUser.roles)
        if (this.currentUser.roles==expectedRole) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}
