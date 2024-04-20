import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/models/interface/types';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() public product!: Product;
  @Output() public addProductToCart = new EventEmitter();
  public quantity = 1;

  public constructor(private productService: ProductListsService) {}
  public addToCart(event: Event) {
    event.stopPropagation();
    const product = { ...this.product, quantity: this.quantity };
    this.productService.storeData<Product>('cartData', product);
    this.addProductToCart.emit(product);
  }
}
