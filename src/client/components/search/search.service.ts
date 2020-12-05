import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';

@Injectable()
export class SearchService {
  constructor(private apiService: ApiService) {}

  public getSchema(url: string): Observable<any> {
    return this.apiService.get(url).pipe(
      pluck('variables')
    );
  }
}
