import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  constructor(private as:AuthService, private router: Router,private http: HttpClient) { }
  
  email="";



  emailSubmit() {
    const url = 'http://localhost:8000/password-reset/';
    const body = { email: this.email };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(url, body, { headers }).subscribe(
      response => {
        console.log('Password reset email sent:', response);
        alert('Password reset email sent. Please check your email.');
      },
      error => {
        console.error('Error during password reset request:', error);
        alert('Error during password reset request.');
      }
    );
  }
}
