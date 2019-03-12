import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterService } from './register.service';
import { RegisterComponent } from './register.component';

import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: RegisterService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('expects to fetch the users details from the database',
    inject([HttpTestingController, RegisterService],
    (httpMock: HttpTestingController, service: RegisterService) => {
      let mockData={name:"john",email:"john@gmail.com",contact:7009195733}
      service.register(mockData).subscribe(data => {
        expect(data).toBeTruthy();
        console.log(data)
      });
      const req = httpMock.expectOne('http://localhost:3000/register');
      expect(req.request.method).toEqual('POST');
      req.flush({ "message": "Successfully Registered! Please login" });
    })
  );
  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    let mockData={name:"john",email:"john@gmail.com",contact:7009195733}
    httpClient.post('http://localhost:3000/register',mockData).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );
    const req = httpTestingController.expectOne('http://localhost:3000/register');
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
