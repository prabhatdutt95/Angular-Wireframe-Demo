import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerURL = "http://localhost:3000/register";
  constructor(private http: HttpClient) { }
  
  register(data: any): Observable<any> {
    return <Observable<any>> this.http.post(this.registerURL,data);
  }
}
