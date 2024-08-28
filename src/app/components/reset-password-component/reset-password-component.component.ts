import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
      this.errorMessage = 'Passwords do not match!';
      return;
    }
  
    const url = 'https://sefa-gur.developerakademie.org/api/reset-password/';
    const body = {
      uid: this.uid,
      token: this.token,
      new_password: this.password
    };
  
    this.http.post(url, body).subscribe(response => {
      console.log('Password has been reset', response);
      this.passwordResetSuccess = true; 
      this.errorMessage = ''; 
      this.router.navigate(['/login']); // Weiterleitung an das Login, wenn das Passwort erfolgreich zurückgesetzt wurde
    }, error => {
      console.error('Error resetting password', error);
      this.errorMessage = 'Error resetting password.'; 
      this.passwordResetSuccess = false; 
    });
  }
  
}
