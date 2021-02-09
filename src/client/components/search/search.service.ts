import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {Cacheable} from 'ts-cacheable';

import {ApiService} from 'services/api.service';
import {SearchResponse, SearchSchemaVariable} from './search.interface';

export const schemaCacheBuster = new Subject<void>();

@Injectable()
export class SearchService {
  public searchResponse = new Subject<SearchResponse>();

  constructor(private readonly apiService: ApiService) {
  }

  @Cacheable({cacheBusterObserver: schemaCacheBuster})
  public getSchema(url: string): Observable<Array<SearchSchemaVariable>> {
    return this.apiService.get(url).pipe(
      pluck('variables')
    );
  }

  @Cacheable({cacheBusterObserver: schemaCacheBuster})
  public search(url: string, searchParams?: { [key: string]: string | Array<string> }): Observable<any> {
    return this.apiService.post(url, searchParams);
  }
}
