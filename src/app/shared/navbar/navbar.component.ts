import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/models/services/auth/authentication.service';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';
import { SearchService } from 'src/app/core/models/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public logo = 'assets/images/logo.png';
  public cart = 'assets/icons/shopping_cart.svg';
  public loginText = false;
  public searchQuery = '';
  public showSearchBar = false;
  public cartQuantity = 0;

  public constructor(private route: Router,
    private authenticationService: AuthenticationService,
    private searchService: SearchService,
    private productServie: ProductListsService
  ) {
  }

  public ngOnInit(): void {
    this.authenticationService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated === false && this.authenticationService.token !== '') {
        this.loginText = true;
      } else{
        this.loginText = isAuthenticated;
      }
    });
    this.productServie.cartQuantity$.subscribe(quantity => {
      this.cartQuantity = quantity || this.productServie.getCartQuantity();
    });
  }

  public login() {
    this.showSearchBar = false;
    this.route.navigate(['/login']);
  }

  public goToCartPage() {
    this.route.navigate(['/carts']);
  }

  public logOut() {
    this.authenticationService.logout();
  }

  public onSearch(): void {
    this.searchService.setSearchQuery(this.searchQuery);
  }
}
