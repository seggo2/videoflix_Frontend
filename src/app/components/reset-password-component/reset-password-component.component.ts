import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/environment';

@Component({
  selector: 'app-reset-password-component',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password-component.component.html',
  styleUrl: './reset-password-component.component.scss'
})
export class ResetPasswordComponentComponent {
  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
  }  
  
  password="";
  passwordConfirm="";
  uid: string = '';
  token: string = '';
  passwordResetSuccess:any
  errorMessage:string="";




  resetPassword() {
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Die Passwörter stimmen nicht überein!';
      return;
    }
  
    const url = `${environment.apiBaseUrl}/api/reset-password/`; // ← backticks, kein String!
    const body = {
      uid: this.uid,
      token: this.token,
      new_password: this.password
    };
  
    this.http.post(url, body).subscribe({
      next: response => {
        console.log('✅ Passwort erfolgreich zurückgesetzt', response);
        this.passwordResetSuccess = true;
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000); // z.B. mit kleiner Verzögerung
      },
      error: error => {
        console.error('❌ Fehler beim Zurücksetzen', error);
        this.passwordResetSuccess = false;
        this.errorMessage =
          error.error?.error || error.error?.message || 'Ein unbekannter Fehler ist aufgetreten.';
      }
    });
  }
  
}
