import { Component, Renderer2, ElementRef ,OnInit } from '@angular/core';
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
