import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListsComponent } from './product-lists.component';
import { SearchService } from 'src/app/core/models/services/search.service';
import { of } from 'rxjs';
import { Product } from 'src/app/core/models/interface/types';

describe('ProductListsComponent', () => {
  let component: ProductListsComponent;
  let fixture: ComponentFixture<ProductListsComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;

  const mockProduct = {
    id: 1,
    title: 'test',
    price: 1,
    description: 'test',
    category: 'test',
    image: 'test',
    rating: {
      rate: 1,
      count: 1
    }
  } as Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListsComponent]
    });
    fixture = TestBed.createComponent(ProductListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call searchService.getSearchQuery()', () => {
    component.getFilterQuery();
    expect(searchServiceSpy.getSearchQuery).toHaveBeenCalled();
  });

  it('should assign searchQuery correctly', () => {
    const searchQuery = 'test';
    searchServiceSpy.getSearchQuery.and.returnValue(of(searchQuery));
    component.getFilterQuery();
    expect(component.searchQuery).toEqual(searchQuery);
  });

  it('should call addItemToCart with correct data', () => {
    const mockProductListsService = jasmine.createSpyObj('ProductListsService', ['addItemToCart']);
    component.addToCart = mockProductListsService;
    component.addToCart(mockProduct);

    expect(mockProductListsService.addItemToCart).toHaveBeenCalledWith(mockProduct);
  });
  it('should call getProducts() with the correct arguments', () => {
    const mockProductListsService = jasmine.createSpyObj('ProductListsService', ['getProducts']);
    component.getAllProducts = mockProductListsService;
    component.getAllProducts();
    expect(component.getAllProducts).toHaveBeenCalled();
  });

  it('should subscribe to the getProducts() observable', () => {
    const mockProductListsService = jasmine.createSpyObj('ProductListsService', ['getProducts']);
    component.getAllProducts = mockProductListsService;
    component.getAllProducts();
    expect(mockProductListsService.getProducts).toHaveBeenCalled();
  });

  it('should not filter products if search query is empty', () => {
    component.searchQuery = '';
    component.filteredProducts = [mockProduct];
    expect(component.products).toEqual([mockProduct]);
  });

  it('should filter products based on single word search query', () => {
    component.searchQuery = 'product';
    component.filteredProducts = [mockProduct];
    expect(component.products).toEqual([mockProduct]);
  });

  it('should filter products based on multiple words search query', () => {
    component.searchQuery = 'product 2';
    component.filteredProducts = [mockProduct];
    expect(component.products).toEqual([mockProduct]);
  });

});
