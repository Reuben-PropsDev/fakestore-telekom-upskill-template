import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { Login } from '../../interface/types';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should login the user', () => {
    const userData = { username: 'test', password: 'password' };
    service.login(userData).subscribe((response) => {
      expect(response).toBeTruthy();
    });
  });

  it('should logout the user', () => {
    service.logout();
    expect(service.userSubject.value).toEqual({} as Login);
  });

  it('should save the user', () => {
    const userData = { token: '12345' };
    service.saveUser(userData);
    expect(service.userSubject.value).toEqual(userData);
  });

  it('should check if user is authenticated', () => {
    expect(service.isAuthenticated).toBeTruthy();
  });

  it('should get the user', () => {
    expect(service.user).toBeTruthy();
  });

  it('should get the token', () => {
    service.saveUser({ token: '12345' });
    expect(service.token).toBeTruthy();
  });

});
