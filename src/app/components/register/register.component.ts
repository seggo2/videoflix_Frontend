import { Component, Renderer2, ElementRef,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router,private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    const backgroundImageUrl = 'assets/thumbnail/movie.jpg';
    const element = this.el.nativeElement.querySelector('.mobileVision');
    if (element) {
      this.renderer.setStyle(element, 'background-image', `url(${backgroundImageUrl})`);
    }
  }

  username: string = '';
  email: string = '';
  password: string = '';
  privacyAccepted = false;
  privacyError:any
  errorMessage="";
  showPopup:any
  
  register() {
    if (this.privacyAccepted) {
      this.privacyError = false;
      const url = `https://sefa-gur.developerakademie.org/register/`;
      const body = {
        username: this.username,
        password: this.password,
        email: this.email,
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      this.http.post(url, body, { headers }).subscribe(
        response => {
          this.showPopup = true; // Popup anzeigen
          this.errorMessage = '';
          this.privacyError = false;
        },
        error => {
          console.error('Fehler beim POST-Request:', error);
          this.errorMessage = error.error && error.error.message ? error.error.message : 'Email already exists';
        }
      );
    } else {
      this.privacyError = true;
    }
  }
  
  closePopup() {
    this.showPopup = false; // Popup ausblenden
    this.router.navigate(['/login']); // Weiterleitung zum Login
  }
  
  loginSite(){
    this.router.navigateByUrl('/login');
  }

  private getCookie(name: string): any | null {
    const cookieValue = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(name + '='));
  
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
    return null;
  }
}

