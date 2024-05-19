import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-component',
  standalone: true,
  imports: [FormsModule],
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

  resetPassword() {
    if (this.password !== this.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    const url = 'http://localhost:8000/api/reset-password/';
    const body = {
      uid: this.uid,
      token: this.token,
      new_password: this.password
    };

    this.http.post(url, body).subscribe(response => {
      console.log('Password has been reset', response);
      alert('Password has been reset successfully.');
      this.router.navigate(['/login']);  
    }, error => {
      console.error('Error resetting password', error);
      alert('Error resetting password.');
    });
  }
}
