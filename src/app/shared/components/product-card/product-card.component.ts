import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/interface/types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() public product!: Product;
  @Output() public addProductToCart = new EventEmitter();
  public quantity = 1;

  public constructor(private route: Router) {}
  public addToCart(event: Event) {
    event.stopPropagation();
    const product = { ...this.product, quantity: this.quantity };
    localStorage.setItem('cartData', JSON.stringify(product));
    this.addProductToCart.emit(product);
  }
}
