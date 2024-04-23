import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/core/models/interface/types';
import { ProductListsService } from 'src/app/core/models/services/products/product-lists.service';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const product = {
    id: 1,
    title: 'Test Product',
    price: 10,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 }
  } as Product;

  const mockEvent = {
    stopPropagation: jasmine.createSpy('stopPropagation')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [
        { provide: ProductListsService, useValue: jasmine.createSpyObj('ProductService', ['storeData']) }
      ]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add product to cart and emit addProductToCart event', () => {
    spyOn(component.addProductToCart, 'emit');
    component.addToCart(mockEvent as unknown as Event);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(component.addProductToCart.emit).toHaveBeenCalledWith({
      ...product,
      quantity: 1
    });
  });

});
