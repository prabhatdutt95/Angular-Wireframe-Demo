import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  errorMessage: string;
  name:string;
  contactNo:number;
  loggedIn: boolean=false;
  constructor(private loginService:LoginService,private router: Router  ) { }

  ngOnInit() {
  }
  login(){
    this.loginService.login(this.contactNo).subscribe(
      (response)=>{
        this.errorMessage="";
        this.loggedIn=true;
        sessionStorage.setItem("name",response.name);
        window.location.reload();
          this.router.navigateByUrl('/home');
        console.log(response)
      },(errorResponse)=>{
        this.loggedIn=false;
        this.errorMessage=errorResponse.error.message;
      }
    )
  }
  
}
