import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient,HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL="http://localhost:3000/login/"
  constructor(private http: HttpClient) { }

  login(contactNo: any): Observable<any> {
    return this.http.get<any>(this.loginURL+contactNo);
  }
}
