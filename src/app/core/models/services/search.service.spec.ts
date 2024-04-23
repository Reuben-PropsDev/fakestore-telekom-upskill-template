import { SearchService } from './search.service';
import { BehaviorSubject, Observable } from 'rxjs';

describe('SearchService', () => {
  let searchService: SearchService;
  let searchQuerySubject: BehaviorSubject<string>;
  let searchQuery$: Observable<string>;

  beforeEach(() => {
    searchQuerySubject = new BehaviorSubject<string>('');
    searchQuery$ = searchQuerySubject.asObservable();
    searchService = new SearchService();
    searchService.searchQuery$ = searchQuery$;
  });


  it('should emit the correct value when a non-empty string is passed in', () => {
    const searchQuery = 'test';
    searchQuerySubject.next(searchQuery);
    const subscription = searchService.searchQuery$.subscribe(value => {
      expect(value).toEqual(searchQuery);
    });
    searchService.setSearchQuery(searchQuery);
    subscription.unsubscribe();
  });

  it('should emit the correct value when an empty string is passed in', () => {
    const searchQuery = '';
    const subscription = searchService.searchQuery$.subscribe(value => {
      expect(value).toEqual(searchQuery);
    });
    searchService.setSearchQuery(searchQuery);
    subscription.unsubscribe();
  });
});
