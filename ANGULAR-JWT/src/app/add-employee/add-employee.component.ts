import { Component, OnInit } from "@angular/core";
import { HttpClientService, Employee } from "../service/httpclient.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  user: Employee = new Employee("", "", "", "");
showSpinner: any=false;

  constructor(private httpClientService: HttpClientService,
    private router: Router) {}

  ngOnInit() {}

  createEmployee(): void {
    console.debug(this.user);
    if((this.user!=null)&&(this.user!=undefined))
   { this.httpClientService.createEmployee(this.user).subscribe(data => {
      alert("Employee created successfully.");
      if(!data)
      {
        this.showSpinner=true;
      }
      else{
        this.showSpinner=false;
      }
      this.router.navigate([''])
    });
  }
  else{
    this.showSpinner=true;
  }
  }
}
