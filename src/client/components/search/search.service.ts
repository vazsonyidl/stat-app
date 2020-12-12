import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

import {ApiService} from '../../services/api.service';
import {SearchResponse, SearchSchemaVariable} from './search.interface';

@Injectable()
export class SearchService {
  public searchResponse = new BehaviorSubject<SearchResponse>(null);

  constructor(private apiService: ApiService) {
  }

  public getSchema(url: string): Observable<Array<SearchSchemaVariable>> {
    return this.apiService.get(url).pipe(
      pluck('variables')
    );
  }

  public search(url: string, searchParams?: { [key: string]: string | Array<string> }): Observable<any> {
    return this.apiService.post(url, searchParams);
  }
}
