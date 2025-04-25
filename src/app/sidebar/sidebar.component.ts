import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(
    private router: Router,
  ) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  showPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
  }

  showUpload(): void {
    this.router.navigate(['/uploadVideos']);
  }
}
