import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username = ''
  password = ''
  invalidLogin = false
  
  @Input() error!: string | null;
showSpinner: any;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }
    register()
    {
      (this.loginservice.register(this.username, this.password).subscribe(
        data => {
          this.router.navigate([''])
          this.invalidLogin = false;
          this.showSpinner=this.invalidLogin;
        },
        error => {
          this.invalidLogin = true;
          if( this.invalidLogin){
            this.router.navigate(['register'])
          }
          this.error = error.message;
  
        }
      )
      )
    }
}
