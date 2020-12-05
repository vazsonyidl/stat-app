import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

import {ApiService} from '../../services/api.service';
import {SearchSchemaVariable} from './search.interface';

@Injectable()
export class SearchService {
  public searchOptions = new BehaviorSubject<any>(null);
  constructor(private apiService: ApiService) {}

  public getSchema(url: string): Observable<Array<SearchSchemaVariable>> {
    return this.apiService.get(url).pipe(
      pluck('variables')
    );
  }
}
