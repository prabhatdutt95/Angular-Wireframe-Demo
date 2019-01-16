import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name :  ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      contact: ['', [ Validators.required,Validators.pattern('^[0-9]{10}$')]],
      })
  }
  register(){
    this.registerService.register(this.registerForm.value).subscribe(
      (response) => {
        this.errorMessage =""
        this.successMessage = response.message;
      },
      (errorResponse) => {
        this.successMessage =""
        this.errorMessage = errorResponse.error.message;
      }
    );
   }

}
