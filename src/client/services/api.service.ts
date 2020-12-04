import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

interface RequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | Array<string>;
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | Array<string>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

const baseOptions: RequestOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpClient) {
  }


  public get(url: string, options?: RequestOptions): Observable<any> {
    return this.http.get(url, {...baseOptions, ...options}).pipe(
      share()
    );
  }
}
