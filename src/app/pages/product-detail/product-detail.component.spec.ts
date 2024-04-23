import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture;
  let mockActivatedRoute;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ id: 1 }),
      snapshot: {
        paramMap: new Map([['id', '1']])
      }
    };

    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should set productId from params on ngOnInit', () => {
    component.ngOnInit();
    expect(component.productId).toEqual(1);
  });
});
