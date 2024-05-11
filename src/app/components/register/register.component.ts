import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}

  username: string = '';
  email: string = '';
  password: string = '';

  register() {
    const url = `http://localhost:8000/register/`;
    const body = {
      username: this.username,
      password: this.password,
      email: this.email,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
  
    this.http.post(url, body, { headers }).subscribe(
      response => {
        this.router.navigate(['/login']);
        alert('Please Check your email')
      },
      error => {
        console.error('Fehler beim POST-Request:', error);
      }
    );
  }

  private getCookie(name: string): any | null {
    const cookieValue = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(name + '='));
  
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
    return null;
  }
}

