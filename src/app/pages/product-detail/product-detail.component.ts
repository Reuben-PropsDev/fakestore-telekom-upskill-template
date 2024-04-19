import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/interface/types';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private productId!: number;
  public product!: Product;
  public quantity!: number;


  public constructor( private route: Router,
    private productDetail: ProductListsService,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      console.log('product id', params['id']);
    });

    this.getProductDetail();
  }
  public navigateToProductList(): void {
    this.route.navigate(['/products']);
  }

  public getProductDetail(): void {
    if (this.productId) {
      this.productDetail.getSingleProduct(this.productId).subscribe(data => {
        this.product = data;
        this.quantity = data.quantity || 1;
        console.log('product detail', data);
      });
    }
  }

  public addToCart(quantity: number) {
    const product = { ...this.product, quantity};
    console.log('product',product);
    this.productDetail.addItemToCart(product);
  }
}
