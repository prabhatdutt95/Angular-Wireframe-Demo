import { Component } from '@angular/core';

@Component({
  selector: 'xyz',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegisterUI';
  loggedIn:boolean=false;
  showDialog:boolean=false;
  userName=sessionStorage.getItem("name")
  confirm(){
    this.showDialog=true;
  }
  logout(){
    this.showDialog=false;
    sessionStorage.clear();
    window.location.reload();
  }
  ngOnInit(){
    if(this.userName){
      this.loggedIn=true;
    }
  }
}
