import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  getUserById(endpoint : any) : Observable<any> {
      return this.http.get<User>(this.getBaseUrl() + endpoint, this.getOptions());
  }

  addUser(endpoint : any, user : User) : Observable<any> {
      return this.http.post<User>(this.getBaseUrl() + endpoint, user, this.getOptions());
  }

  private getBaseUrl() : string {
      return 'http://localhost:8081';
  }

  private getOptions() {
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      }
  }
}