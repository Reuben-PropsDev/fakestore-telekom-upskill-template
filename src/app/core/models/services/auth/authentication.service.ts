import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.develop';
import { MasterService } from '../master/master.service';
import { APIConstant } from 'src/app/core/constants/APIConstant';
import { Login, LoginUser } from '../../interface/types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private getLoginURL = `${environment.apiBaseUrl}${APIConstant.login}`;
  private userSubject!: BehaviorSubject<Login>;
  public user!: Observable<Login>;
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  private constructor(private master: MasterService) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!) ||
      document.cookie.split('=')[1]
    );
    this.user = this.userSubject.asObservable();
  }

  public login(userData: LoginUser) {
    return this.master.login(this.getLoginURL, userData)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.saveUser(response);
            this.isAuthenticatedSubject.next(true);
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next({} as Login);
    this.isAuthenticatedSubject.next(false);
  }

  private saveUser(user: Login): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public get token() {
    return this.userSubject.value.token || '';
  }


  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
