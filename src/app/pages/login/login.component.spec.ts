import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/models/services/auth/authentication.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  let route: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    authenticationService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    route = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      username: ['testUser', Validators.required],
      password: ['testPass', Validators.required]
    });
    fixture.detectChanges();
  });

  it('should initialize loginForm with required username and password fields', () => {
    const loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    expect(component.loginForm).toEqual(loginForm);
  });

  it('should navigate to /products when login is successful', () => {
    authenticationService.login.and.returnValue(of(true));
    component.login();
    expect(route.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should set errorMessage to "Invalid username or password." when login is unsuccessful', () => {
    authenticationService.login.and.returnValue(of(false));
    component.login();
    expect(component.errorMessage).toEqual('Invalid username or password.');
  });

  it('should set errorMessage to "Please provide both username and password." when login form is invalid', () => {
    component.loginForm.get('username')!.setValue('');
    component.login();
    expect(component.errorMessage).toEqual('Please provide both username and password.');
  });

  it('should set errorMessage to the error message when login errors', () => {
    const errorMessage = 'An error occurred';
    authenticationService.login.and.returnValue(throwError(errorMessage));
    component.login();
    expect(component.errorMessage).toEqual(errorMessage);
  });
});
