import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share} from 'rxjs/operators';

import {NotificationService} from './notification.service';

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
  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService) {
  }

  public get(url: string, options?: RequestOptions): Observable<any> {
    return this.http.get(url, {...baseOptions, ...options}).pipe(
      share()
    );
  }

  public post(url: string, params: { [key: string]: string | Array<string> } = {}): Observable<any> {
    return this.http.post(url, {}, {...baseOptions, params}).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.displayNotification(error);
        return EMPTY;
      })
    );
  }
}
