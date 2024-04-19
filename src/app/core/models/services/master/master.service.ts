import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart, Login, LoginUser, Product } from '../../interface/types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  public constructor(private http: HttpClient) { }

  public login(url: string, userData: LoginUser) {
    return this.http.post<Login>(url, { ...userData });
  }

  public getProducts(url: string) {
    return this.http.get<Product[]>(url);
  }

  public getSingleProduct(url: string) {
    return this.http.get<Product>(url);
  }

  public getCategories(url: string) {
    return this.http.get(url);
  }

  public getUsers(url: string) {
    console.log('url',url);
    return this.http.get(url);
  }

  public addToCart(url: string, data: Product) {
    console.log('data in addToCart',data);
    return this.http.post<ICart>(url, {...data});
  }
}
