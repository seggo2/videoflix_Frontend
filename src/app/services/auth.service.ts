import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginWithUsernameAndPassword(username:string, password:string){
    const url = `${environment.apiBaseUrl}/login/`;
    const body = {
      "username": username,
      "password": password
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
