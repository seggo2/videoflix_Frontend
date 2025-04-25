import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/environment';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  constructor(private as: AuthService, private router: Router, private http: HttpClient) {}

  email: string = '';
  errorMessage: string = '';
  passwordResetSuccess: boolean = false;

  loginSite(){
    this.router.navigateByUrl('/login');
  }

  emailSubmit() {
    const url = `${environment.apiBaseUrl}/password-reset/`; // backticks für string interpolation!
    const body = { email: this.email };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, body, { headers }).subscribe(
      response => {
        console.log('✅ Passwort-Reset erfolgreich:', response);
        this.passwordResetSuccess = true;
        this.errorMessage = '';
      },
      error => {
        console.error('❌ Fehler beim Passwort-Reset:', error);

        this.passwordResetSuccess = false;

        // 👇 Smartes Error-Handling
        if (typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else if (error.error?.error) {
          this.errorMessage = error.error.error;
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Es ist ein unbekannter Fehler aufgetreten.';
        }
      }
    );
  }
}


