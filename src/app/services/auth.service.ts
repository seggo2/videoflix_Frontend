import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginWithUsernameAndPassword(username:string, password:string){
    const url = 'http://localhost:8000/login/';
    const body = {
      "username": username,
      "password": password
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
