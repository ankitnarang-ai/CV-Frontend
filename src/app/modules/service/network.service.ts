import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: any): Observable<T> {
    console.log('enter params', params)
    return this.http.get<T>(url, { 
      params: this.getParams(params),
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  delete<T>(url: string, params?: any): Observable<T> {
    return this.http.delete<T>(url, { params: this.getParams(params) });
  }

  private getParams(params: any): HttpParams {
    console.log('enter params', params)
    return params
      ? Object.keys(params).reduce((p, key) => p.set(key, params[key]), new HttpParams())
      : new HttpParams();
  }
}