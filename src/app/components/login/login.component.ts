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
  constructor(private as:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async login() {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      // Token im Local Storage speichern
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/videoflix');
    } catch (e) {
      alert('Confirm your mail address');
      console.error(e);
    }
  }
  register(){
    this.router.navigateByUrl('/register');
  }
}
