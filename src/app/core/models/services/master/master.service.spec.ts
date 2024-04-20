import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MasterService } from './master.service';

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
    const errorMessage = 'Invalid credentials';

    service.login(url, userData).subscribe(
      () => fail('Expected an error, but got a response'),
      error => expect(error).toEqual(errorMessage)
    );

    const req = httpMock.expectOne(url);
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });
});
