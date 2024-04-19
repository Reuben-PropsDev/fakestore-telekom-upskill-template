import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/interface/types';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart: Product[] = [];
  public totalCost = 0;
  public quantity!: number;

  public constructor(private productService: ProductListsService) {}

  public ngOnInit(): void {
    this.cart = this.productService.getCartData();
    console.log('cart', this.cart, '..........',this.productService.getCartData());
    this.calculateTotalCost();
  }

  public calculateTotalCost() {
    this.totalCost = this.cart.reduce((sum, item) => sum + item.price * (item.quantity ? item.quantity : 1), 0);
  }

  public removeItem(item: number) {
    console.log('item', item);
    // this.productService.removeItemFromCart(item);
    // this.updateCart();
  }

  public updateCart() {
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    this.calculateTotalCost();
  }

  public proceedToCheckout() {
    // Implement your checkout logic here
    console.log('Proceeding to checkout...');
    // You can navigate to the checkout page if needed
  }
}
