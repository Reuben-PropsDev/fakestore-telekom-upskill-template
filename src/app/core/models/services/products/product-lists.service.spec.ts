import { TestBed } from '@angular/core/testing';

import { ProductListsService } from './product-lists.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../../interface/types';

describe('ProductListsService', () => {
  let service: ProductListsService;

  const product = {
    id: 1,
    title: 'test',
    price: 1,
    description: 'test',
    category: 'test',
    image: 'test',
    quantity: 2,
    rating: { rate: 1, count: 1 }
  } as Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ProductListsService]
    });
    service = TestBed.inject(ProductListsService);
  });

  it('should initialize cartQuantitySubject with the correct length', () => {
    expect(service.cartQuantitySubject.value).toBe(JSON.parse(localStorage.getItem('cartData') ?? '[]').length);
  });

  it('should initialize cartDataSubject with cartData from localStorage', () => {
    expect(service.cartDataSubject.value).toEqual(JSON.parse(localStorage.getItem('cartData') ?? '[]'));
  });

  it('should populate cart with data from cartDataSubject value', () => {
    if (service.cartDataSubject.value) {
      expect(service.cart).toEqual([...service.cartDataSubject.value]);
    }
  });

  it('should add product to cart', () => {
    service.addItemToCart(product);
    const addedProduct = service.cart.find(cartItem => cartItem.id === product.id);
    expect(addedProduct).toBeDefined();
    if (addedProduct) {
      expect(addedProduct.quantity).toBe(product.quantity);
    }
  });

  it('should remove product from cart', () => {
    service.addItemToCart(product);
    service.removeItemFromCart(product.id);
    expect(service.cart).not.toContain(product);
  });

  it('should get update for the carts', () => {
    service.getStoredData = jasmine.createSpy().and.returnValue([product]);
    service.updateCartData();

    service.cartDataSubject.subscribe(cartData => {
      expect(cartData).toContain(product);
    });

    service.cartQuantitySubject.subscribe(quantity => {
      expect(quantity).toBe(1);
    });
  });

  it('should update cartDataSubject with the stored cart data', () => {
    spyOn(service, 'getStoredData').and.returnValue([product]);

    service.updateCartData();

    expect(service.getStoredData).toHaveBeenCalledWith('cartData');
    expect(service.cartDataSubject.value).toEqual([product]);
  });

  it('should update cartQuantitySubject with the length of the cart data', () => {
    spyOn(service, 'getStoredData').and.returnValue([product]);

    service.updateCartData();

    expect(service.getStoredData).toHaveBeenCalledWith('cartData');
    expect(service.cartQuantitySubject.value).toEqual([product].length);
  });

  it('should return the cart data', () => {
    service.cartDataSubject.next([product]);
    expect(service.getCartData()).toEqual([product]);
  });

  it('should return an empty array if there is no cart data', () => {
    service.cartDataSubject.next([]);
    expect(service.getCartData()).toEqual([]);
  });

});
