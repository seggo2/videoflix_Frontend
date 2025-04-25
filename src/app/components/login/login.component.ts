import { Component, Renderer2, ElementRef ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string='';
  constructor(private as:AuthService, private router: Router,private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    const backgroundImageUrl = 'assets/thumbnail/movie.jpg';
    const element = this.el.nativeElement.querySelector('.mobileVision');
    if (element) {
      this.renderer.setStyle(element, 'background-image', `url(${backgroundImageUrl})`);
    }
  }
  
  async login() {
    try {
      const resp: any = await this.as.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/videoflix');
      this.errorMessage = ''; // Reset on success
    } catch (e: any) {
      console.error('❌ Login-Fehler:', e);
      this.errorMessage =
        e?.error?.error || // z.B. "username or password are incorrect"
        e?.error?.message || // falls später geändert
        'Ein unbekannter Fehler ist aufgetreten.';
    }
  }
  

  newPassword(){
    this.router.navigateByUrl('/new-password');
  }
  
  register(){
    this.router.navigateByUrl('/register');
  }
  
  guestLogin() {
    this.username = 'gast';
    this.password = 'gast123';
    this.login();
  }
}
