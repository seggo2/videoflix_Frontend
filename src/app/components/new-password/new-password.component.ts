import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  constructor(private as:AuthService, private router: Router,private http: HttpClient) { }
  
  email="";
  errorMessage="";
  passwordResetSuccess:any

  emailSubmit() {
    const url = 'https://sefa-gur.developerakademie.org/password-reset/';
    const body = { email: this.email };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(url, body, { headers }).subscribe(
      response => {
        console.log('Password reset email sent:', response);
        this.passwordResetSuccess = true; 
        this.errorMessage = ''; 
      },
      error => {
        console.error('Error during password reset request:', error);
        this.errorMessage = 'Error during password reset request.';
        this.passwordResetSuccess = false; 
      }
    );
  }
  
}
