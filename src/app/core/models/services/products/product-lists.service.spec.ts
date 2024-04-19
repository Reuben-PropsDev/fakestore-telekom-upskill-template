import { TestBed } from '@angular/core/testing';

import { ProductListsService } from './product-lists.service';

describe('ProductListsService', () => {
  let service: ProductListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
