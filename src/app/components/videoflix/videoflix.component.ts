import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-videoflix',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './videoflix.component.html',
  styleUrl: './videoflix.component.scss',
})
export class VideoflixComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  isModalVisible = false;
  name = '';
  error = '';
  videos: any;
  resolutions = ['1080p', '720p', '480p'];
  selectedResolution = '1080p';
  videoUrl: any;
  isFullscreen = false;
  videoUrls: any;
  searchTerm = '';
  imagesData: any;
  filteredImagesData:any

  async ngOnInit() {
    try {
      this.videos = await this.loadVideos();
      this.filterImages("")
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  async manageAccount(): Promise<void> {
    this.router.navigate(['/accountDetails']);
  }

  showPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  async loadVideos() {
    const url = 'https://sefa-gur.developerakademie.org/videoflix/';
    const token = localStorage.getItem('token');
    if (!token) {
        this.router.navigate(['/login']);
        return Promise.reject('Token not found');
    }
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.get(url, { headers });
        const imageUrls = response.data;
        if (imageUrls.length === 0) {
            console.log('No images found.');
            return;
        }
        this.imagesData = await this.downloadImages(imageUrls);
        console.log('Images loaded successfully:', this.imagesData);
    } catch (error) {
        console.error('Error loading videos:', error);
    }
}

async downloadImages(imageUrls:string) {
    try {
        const imagesData = [];
        for (const imageUrl of imageUrls) {
            const imageName = imageUrl.split('/').pop();
            const backendImageUrl = `https://sefa-gur.developerakademie.org/download-image/${imageName}/`;
            const response = await axios.get(backendImageUrl, { responseType: 'json' });
            const imageData = response.data;
            imagesData.push({
                title: imageData.title,
                description: imageData.description,
                imageUrl: imageData.image_url,
                name: imageName,
            });
        }
        return imagesData;
    } catch (error) {
        console.error('Error downloading images:', error);
        return [];
    }
}


  async getVideo(name: string) {
    const url = `https://sefa-gur.developerakademie.org/videos/${name}/`;
    try {
      const response: any = await this.http.get(url).toPromise();
      console.log('Video response:', response);
      this.videoUrls = response;
      this.setVideoUrl();
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  }

  setVideoUrl() {
    this.videoUrl = this.videoUrls[this.selectedResolution];
  }

  changeResolution(resolution: string, event: MouseEvent) {
    if (this.selectedResolution !== resolution) {
      this.selectedResolution = resolution;
      this.setVideoUrl();
    }
  }

  async playVideo(name: string) {
    await this.getVideo(name);
  }

  closeVideo(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.videoUrl = null;
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  filterImages(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      this.filteredImagesData = this.imagesData;
    } else {
      this.filteredImagesData = this.imagesData.filter((imageData: any) =>
        imageData.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  
  
}
