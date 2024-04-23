import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { Product } from 'src/app/core/models/interface/types';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent]
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch cart data', () => {
    component.getCarts();
    expect(component.cart).toBeTruthy();
  });

  it('should calculate total cost', () => {
    component.calculateTotalCost();
    expect(component.totalCost).toBeTruthy();
  });

  it('should remove item from cart', () => {
    component.removeItem(1);
    expect(component.cart.length).toBe(0);
  });

  it('should update cart', () => {
    component.updateCart();
    expect(component.cart.length).toBe(0);
  });

  it('should update quantity', () => {
    component.onQuantityChange({} as Product);
    expect(component.quantity).toBe(1);
  });
});
