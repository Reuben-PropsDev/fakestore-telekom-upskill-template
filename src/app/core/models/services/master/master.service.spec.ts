import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MasterService } from './master.service';
import { Product } from '../../interface/types';

describe('MasterService', () => {
  let service: MasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterService]
    });
    service = TestBed.inject(MasterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should make a POST request to the correct URL with the correct data', () => {
    const url = 'https://example.com/login';
    const userData = { username: 'test', password: 'password' };

    service.login(url, userData).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
  });

  it('should return the expected response', () => {
    const url = 'https://example.com/login';
    const userData = { username: 'test', password: 'password' };
    const expectedResponse = { token: '12345' };

    service.login(url, userData).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(url);
    req.flush(expectedResponse);
  });


  it('should handle errors correctly', () => {
    const url = 'https://example.com/login';
    const userData = { username: 'test', password: 'password' };

    service.login(url, userData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
      }
    });

    const req = httpMock.expectOne(url);
    req.error(new ErrorEvent('error'));
  });

  it('should fetch data successfully from the given URL', () => {
    const url = 'https://example.com/products';
    const mockProducts: Product[] = [];

    service.getProducts(url).subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(url);
    req.flush(mockProducts);
    httpMock.verify();
  });

  it('should fetch a single product successfully', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 9.99,
      description: 'A great product',
      category: 'Electronics',
      image: 'https://example.com/image.jpg',
      rating: { rate: 4.5, count: 100 }
    };
    const url = 'https://example.com/products/1';

    service.getSingleProduct(url).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should call the HttpClient get method with the correct URL', () => {
    const url = 'https://example.com/categories';
    const httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    const masterService = new MasterService(httpMock);

    masterService.getCategories(url);

    expect(httpMock.get).toHaveBeenCalledWith(url);
  });
});
