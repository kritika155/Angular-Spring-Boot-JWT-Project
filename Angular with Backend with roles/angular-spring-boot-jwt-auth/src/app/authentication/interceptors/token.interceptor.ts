import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/service/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
            if (this.authenticationService.isUserSignedin() && this.authenticationService.getToken()) {
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${this.authenticationService.getToken()}`
                    Authorization: this.authenticationService.getToken(),
                    'Access-Control-Allow-Origin':' *'
                }
            });
        }

        return next.handle(request);
    }
}