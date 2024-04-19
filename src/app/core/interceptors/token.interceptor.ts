import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../models/services/auth/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public constructor(private readonly authenticationService: AuthenticationService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.token,
    });
    const newRequest = request.clone({ headers: newHeaders });

    return next.handle(newRequest);
  }
}
