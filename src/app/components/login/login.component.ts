import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string='';
  constructor(private as:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async login() {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/videoflix');
    } catch (e: any) {
       this.errorMessage = 'An error occurred during login.';
      if (e.error.detail) {
       this.errorMessage = e.error.detail
      }
      console.error(e);
    }
  }
  
  
  register(){
    this.router.navigateByUrl('/register');
  }
}
