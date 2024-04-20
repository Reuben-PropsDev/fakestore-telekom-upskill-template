import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/interface/types';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';
import { SearchService } from 'src/app/core/models/services/search.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {

  public searchQuery = '';
  public products: Product[] = [];
  public filteredProducts: Product[] = [];

  public constructor(private router: Router,
    private allProducts: ProductListsService,
    private searchService: SearchService
  ) {}

  public ngOnInit(): void {
    this.getAllProducts();
  }

  public getFilterQuery(): void {
    this.searchService.getSearchQuery().subscribe(searchQuery => {
      this.searchQuery = searchQuery;
      this.filterProducts();
    });
  }

  public addToCart(data:Product) {
    this.allProducts.addItemToCart(data);
  }

  public navigateToProductDetail(id: number): void {
    this.router.navigate(['product/', id]);
  }

  private getAllProducts(){
    this.allProducts.getProducts().subscribe({
      next: (data) =>{
        this.products = data;
        this.getFilterQuery();
      },
      error: (error) => {
        console.error('error',error);
      }
    });
  }

  private filterProducts(): void {
    const searchTerm = this.searchQuery.trim().toLowerCase();
    if (searchTerm === '') {
      this.products = [...this.products];
    } else {
      this.allProducts.getProducts().subscribe(data => {
        const searchTerm = this.searchQuery.toLowerCase();
        this.products = data.filter(product =>
          product.title.toLowerCase().includes(searchTerm)
        );
      });
    }
  }

}
