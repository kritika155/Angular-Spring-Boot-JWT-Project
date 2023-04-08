import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  
  @Input() error!: string | null;
showSpinner: any;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }
  signup(){
    this.router.navigate(['/register'])
  }
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
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
    );

  }

}