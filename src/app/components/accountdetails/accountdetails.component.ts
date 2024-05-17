import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-accountdetails',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,MatIconModule],
  templateUrl: './accountdetails.component.html',
  styleUrl: './accountdetails.component.scss'
})
export class AccountdetailsComponent implements OnInit{
  constructor(private http: HttpClient ,private router: Router ) {}

  isModalVisible = false;

  user:any = {
    first_name: '',
    last_name: '',
    phone: '',
    aadress:''
  };
  async ngOnInit() {
    await this.manageAccount();
 }

  back2main(): void{
    this.router.navigate(['/videoflix']);
  }

  showPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  async manageAccount(): Promise<void> {
    const url = 'http://localhost:8000/user/';
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.router.navigate(['/login']);
      console.error('Token not found');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    });
  
    try {
      const response = await this.http.get(url, { headers }).toPromise();
      this.user = response as any;
      console.log(this.user);
    } catch (error) {
      console.error('Error loading user details', error);
    }
  }

  async updateUser(): Promise<void> {
    const url = 'http://localhost:8000/user/';
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.router.navigate(['/login']);
      console.error('Token not found');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    });

    try {
      const response = await this.http.put(url, this.user, { headers }).toPromise();
      alert('Data updated successfully');

    } catch (error) {
      console.error('Error updating user details', error);
    }
  }
}


