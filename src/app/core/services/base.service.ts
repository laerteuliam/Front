import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class BaseService<T> {
  abstract uri: string;

  constructor(public httpClient: HttpClient) {
  }

  get(): Observable<Array<T>> {
      return this.httpClient.get<Array<T>>(this.uri);
  }
  post(data: T): Observable<any> {
      return this.httpClient.post<any>(this.uri, data);
  }
  put(data: T): Observable<any> {
      return this.httpClient.put<any>(this.uri, data);
  }
  delete(param: string): Observable<any> {
      return this.httpClient.delete(this.uri + '?' + param);
  }
}
