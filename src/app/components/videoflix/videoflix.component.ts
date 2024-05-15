import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videoflix',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './videoflix.component.html',
  styleUrl: './videoflix.component.scss'
})
export class VideoflixComponent implements OnInit {
  constructor(private http: HttpClient ,private router: Router) {}

  isModalVisible = false;
  error = '';
  videos:any
  imagesData:any
  user:any = {
    first_name: '',
    last_name: '',
    phone: '',
    aadress:''
  };

  async ngOnInit() {
    try {
      this.videos = await this.loadVideos();
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  logout(): void {
    debugger
    const url = `http://localhost:8000/logout/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
  
    this.http.post(url,  { headers }).subscribe(
      response => {
        this.router.navigate(['/login']);
        alert('Please Check your email')
      },
      error => {
        console.error('Fehler beim POST-Request:', error);
      }
    );
  }

  async manageAccount(): Promise<void> {
    debugger
    const url = 'http://localhost:8000/user/';
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token not found in localStorage');
      throwError('Token not found');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    });
  
    await lastValueFrom(this.http.get(url, { headers }))
      .then(data => {
        this.user = data as any;
        console.log(this.user)
      })
      .catch(error => {
        console.error('Error loading user details', error);
      });
  }

  showPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
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

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  async loadVideos(): Promise<void> {
    const url = 'http://localhost:8000/videoflix/';
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return Promise.reject('Token not found');
    }
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.get<string[]>(url, { headers });
      const imageUrls: string[] = response.data;
      if (imageUrls.length === 0) {
        console.log('No images found.');
        return;
      }
      this. imagesData = await this.downloadImages(imageUrls);
      console.log('Images loaded successfully:', this.imagesData);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  }
  
  async downloadImages(imageUrls: string[]): Promise<any[]> {
    try {
      const imagesData: any[] = [];
  
      for (const imageUrl of imageUrls) {
        const imageName: string = imageUrl.split('/').pop()!;
        const backendImageUrl = `http://localhost:8000/download-image/${imageName}/`;
        const response = await axios({
          method: 'GET',
          url: backendImageUrl,
          responseType: 'json', 
        });
  
        const imageData: any = response.data;
        const blobUrl = `http://localhost:8000/media/videos/${imageName}`;
  
        imagesData.push({
          title: imageData.title,
          description: imageData.description,
          imageUrl: blobUrl,
          name:imageName
        });
      }
  
      return imagesData;
    } catch (error) {
      console.error('Error downloading images:', error);
      return [];
    }
  }
}
