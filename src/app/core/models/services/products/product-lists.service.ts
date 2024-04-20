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
  public cartQuantitySubject = new BehaviorSubject<number>(0);
  public cartQuantity$ = this.cartQuantitySubject.asObservable();
  public cart: Product[] = [];
  public cartDataSubject = new BehaviorSubject<Product[]>([]);
  public cartData$ = this.cartDataSubject.asObservable();

  private getProductURL = `${environment.apiBaseUrl}${APIConstant.products}`;
  private getCartURL = `${environment.apiBaseUrl}${APIConstant.cart}`;

  public constructor(private master: MasterService) {
    this.cartQuantitySubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('cartData') ?? '[]').length
    );
    this.cartDataSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('cartData') ?? '[]')
    );
    if (this.cartDataSubject.value) {
      this.cart = [...this.cartDataSubject.value];
    }
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
    this.storeData<Product[]>('cartData',this.cart);
    this.updateCartData();

  }

  public getCartData() {
    return this.cartDataSubject.value;
  }

  public removeItemFromCart(id: number) {
    this.cart = this.cart.filter(cartItem => cartItem.id !== id);

    this.storeData<Product[]>('cartData', this.cart);
    this.updateCartData();
  }


  public updateCartData() {
    const cartData = this.getStoredData('cartData');
    this.cartDataSubject.next(cartData);
    this.cartQuantitySubject.next(cartData.length);
  }

  public addToCart(data: Product) {
    return this.master.addToCart(`${this.getCartURL}`, {...data});
  }

  public storeData<T>(keyName: string, data: T) {
    localStorage.setItem(keyName, JSON.stringify(data));
  }

  public getStoredData(keyName: string) {
    return JSON.parse(localStorage.getItem(keyName) ?? '[]');
  }
}
