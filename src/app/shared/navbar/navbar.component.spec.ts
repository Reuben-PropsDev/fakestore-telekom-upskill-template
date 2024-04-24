import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from 'express';
import { AuthenticationService } from 'src/app/core/models/services/auth/authentication.service';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';
import { SearchService } from 'src/app/core/models/services/search.service';
import { BehaviorSubject, of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authenticationService: AuthenticationService;
  let productService: ProductListsService;
  let searchService: SearchService;
  let router: Router;

  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logout'], {
    isAuthenticated$: new BehaviorSubject<boolean>(false),
    token: ''
  });
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getCartData'], {
    cartQuantity$: new BehaviorSubject<number>(0)
  });
  const searchServiceSpy = jasmine.createSpyObj('SearchService', ['setSearchQuery']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: ProductListsService, useValue: productServiceSpy },
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    productService = TestBed.inject(ProductListsService);
    searchService = TestBed.inject(SearchService);
    router = TestBed.inject(Router);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set cart quantity and loginText on ngOnInit', () => {
    authenticationService.isAuthenticatedSubject.next(true);
    expect(component.loginText).toBe(true);

    authenticationService.isAuthenticatedSubject.next(false);
    expect(component.loginText).toBe(false);

    productService.cartQuantitySubject.next(1);
    expect(component.cartQuantity).toBe(1);
  });

  it('should navigate to login page', () => {
    component.login();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call setSearchQuery on searchService', () => {
    const searchQuery = 'test';
    component.onSearch();
    expect(searchService.setSearchQuery).toHaveBeenCalledWith(searchQuery);
  });

  it('should navigate to cart page', () => {
    component.goToCartPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cart']);
  });


  it('should logout on logout', () => {
    authenticationService.logout();
    expect(authenticationService.logout).toHaveBeenCalled();
    expect(component.loginText).toBe(false);
  });
});
