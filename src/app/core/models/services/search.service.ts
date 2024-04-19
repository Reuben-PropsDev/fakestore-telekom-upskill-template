import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  public setSearchQuery(searchQuery: string): void {
    this.searchQuerySubject.next(searchQuery);
  }

  public getSearchQuery(): Observable<string> {
    return this.searchQuery$;
  }
}
