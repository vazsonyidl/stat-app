import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {share} from "rxjs/operators";

@Injectable()
export class ApiService{
  constructor(private readonly http: HttpClient) {
  }

  public get(url: string): Observable<any> {
    return this.http.get(url).pipe(
      share()
    );
  }
}
