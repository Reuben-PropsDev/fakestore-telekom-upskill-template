import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { APIConstant } from 'src/app/core/constants/APIConstant';
import { environment } from 'src/environments/environment.develop';
import { Product } from '../../interface/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListsService {
  private cartQuantitySubject = new BehaviorSubject<number>(0);
  public cartQuantity$ = this.cartQuantitySubject.asObservable();
  private cart: Product[] = [];
  public cartDataSubject = new BehaviorSubject<Product[]>([]);
  public cartData$ = this.cartDataSubject.asObservable();

  private getProductURL = `${environment.apiBaseUrl}${APIConstant.products}`;
  private getCartURL = `${environment.apiBaseUrl}${APIConstant.cart}`;

  public constructor(private master: MasterService) {
    this.cartQuantitySubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('cartData')!).length || 0
    );
    this.cartDataSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('cartData')!)
    );
    this.cart = this.cartDataSubject.value;
  }

  public getProducts() {
    return this.master.getProducts(this.getProductURL);
  }

  public getSingleProduct(id: number) {
    return this.master.getSingleProduct(`${this.getProductURL}/${id}`);
  }

  public addItemToCart(item: Product) {
    const existingItemIndex = this.cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const existingItem = this.cart[existingItemIndex];
      existingItem.quantity = (existingItem.quantity ?? 0) + (item.quantity ?? 1);
    } else {
      this.cart.push(item);
    }
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    this.updateCartQuantity();
    this.updateCartData();
    this.getCartQuantity();
  }

  public getCart() {
    return this.cart;
  }

  public getCartData() {
    return this.cartDataSubject.value;
  }

  public removeItemFromCart(id: number) {
    this.cart = this.cart.filter(cartItem => cartItem.id !== id);
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    this.updateCartData();
  }

  public clearCart() {
    this.cart = [];
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    this.updateCartData();
  }

  public updateCartData() {
    this.cartDataSubject.next(this.cart);
  }

  public updateCartQuantity() {
    this.cartQuantitySubject.next(this.cart.length);
  }

  public getCartQuantity() {
    return this.cart.length || this.cartQuantitySubject.value;
  }


  public addToCart(data: Product) {
    return this.master.addToCart(`${this.getCartURL}`, {...data});
  }
}
