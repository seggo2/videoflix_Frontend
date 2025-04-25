import { Component, Renderer2, ElementRef,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent  {
  constructor(private http: HttpClient, private router: Router,private renderer: Renderer2, private el: ElementRef) {}


  registrationSuccess: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  privacyAccepted = false;
  privacyError:any
  errorMessage="";
  step: number = 1;

  register() {
    const url = `${environment.apiBaseUrl}/register/`;
    const body = {
      username: this.username,
      password: this.password,
      email: this.email,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post(url, body, { headers }).subscribe(
      response => {
        this.errorMessage = '';
        this.registrationSuccess = true;
      },
      error => {
        this.registrationSuccess = false;
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
  
  next() {
    if (this.step === 1) {
      if (!this.username || !this.email) {
        this.errorMessage = 'Bitte alle Felder ausfüllen';
        return;
      }
      const url = `${environment.apiBaseUrl}/check-user/`;
      this.http.post(url, { username: this.username, email: this.email }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(
          response => {
            this.step++;
            this.errorMessage = '';
          },
          error => {
            this.errorMessage = error.error?.error || 'Benutzername oder E-Mail ist bereits vergeben.';
          }          
        );
  
      return;
    }
  
    if (this.step === 2) {
      if (!this.password) {
        debugger
        this.errorMessage = 'Bitte gib ein Passwort ein';
        return;
      }
    }
      if (!this.privacyAccepted) {
        debugger
        this.privacyError = true;
        this.errorMessage = 'Bitte akzeptiere die Datenschutzrichtlinie';
        return;
      }

    this.register()
    this.errorMessage = '';
    this.privacyError = false;
    this.step++;
  }

  back() {
    if (this.step > 1) this.step--;
  }

 
  loginSite(){
    this.router.navigateByUrl('/login');
  }


}

