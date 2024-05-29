import { Injectable } from '@angular/core';
import { User } from './model/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:9090/api/v1/users';
  addProduct(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    return this.http.post<User>(`${this.baseUrl}`, JSON.stringify(user), httpOptions);
  }
}
