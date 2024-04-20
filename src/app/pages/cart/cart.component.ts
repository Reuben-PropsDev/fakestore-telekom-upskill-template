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
    this.getCarts();
    this.calculateTotalCost();
  }

  public getCarts(){
    return this.cart = this.productService.getCartData();
  }

  public calculateTotalCost() {
    this.totalCost = this.cart.reduce((sum, item) => sum + item.price * (item.quantity ? item.quantity : 1), 0);
  }

  public removeItem(item: number) {
    this.productService.removeItemFromCart(item);
    this.getCarts();
    this.updateCart();
  }

  public updateCart() {
    this.productService.storeData<Product[]>('cartData', this.cart);
    this.calculateTotalCost();
  }

  public onQuantityChange(item: Product) {
    if (item.quantity && item.quantity < 1) {
      item.quantity = 1;
    }
    this.updateCart();
  }
}
