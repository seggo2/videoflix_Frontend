import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-videoflix',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './videoflix.component.html',
  styleUrl: './videoflix.component.scss'
})
export class VideoflixComponent implements OnInit {
  constructor(private http: HttpClient) {}

  error = '';
  videos:any
  imagesData:any

  async ngOnInit() {
    try {
      this.videos = await this.loadVideos();
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
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
