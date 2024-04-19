import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  public setSearchQuery(searchQuery: string): void {
    console.log('searchQuery',searchQuery);
    this.searchQuerySubject.next(searchQuery);
  }

  public getSearchQuery(): Observable<string> {
    console.log('searchQuerybbbb',this.searchQuery$);
    return this.searchQuery$;
  }
}
