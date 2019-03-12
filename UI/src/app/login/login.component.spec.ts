import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { LoginComponent } from './login.component';

// Other imports for mocking the service
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports:[
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('expects to fetch the users details from the database',
    inject([HttpTestingController, LoginService],
    (httpMock: HttpTestingController, service: LoginService) => {
      service.login(7540863544).subscribe(data => {
        expect(data).toBeTruthy();
        console.log(data)
      });
      const req = httpMock.expectOne('http://localhost:3000/login/7540863544');
      expect(req.request.method).toEqual('GET');
      req.flush({name:"jack",contact:7540863544,email:"jack@gmail.com",salary:123.56});
    })
  );
  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    httpClient.get('http://localhost:3000/login/7540863544').subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );
    const req = httpTestingController.expectOne('http://localhost:3000/login/7540863544');
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
  it('has a name input which is empty on page load',()=>{
    const htmlElement = fixture.debugElement.nativeElement;
    const nameInput = htmlElement.querySelector('input')[0];
    expect(nameInput).toBeTruthy();
  })
});
