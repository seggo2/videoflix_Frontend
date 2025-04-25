import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../enviroments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  videoFile: File | null = null;
  videoTitle: string = '';
  videoDescription: string = '';
  uploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  uploadError = false;
  formError: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.videoFile = event.target.files[0];
    this.resetStatus();
  }

  onSubmit(): void {
    this.resetStatus();

    if (!this.videoFile || !this.videoTitle.trim() || !this.videoDescription.trim()) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('video', this.videoFile, this.videoFile.name);
    formData.append('title', this.videoTitle.trim());
    formData.append('description', this.videoDescription.trim());

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    this.uploading = true;

    this.http.post<HttpEvent<any>>(
      `${environment.apiBaseUrl}/upload-video/`,
      formData,
      {
        headers,
        observe: 'events',
        reportProgress: true,
      }
    ).subscribe(
      event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            }
            break;
          case HttpEventType.Response:
            this.uploading = false;
            this.uploadSuccess = true;
            break;
        }
      },
      error => {
        this.uploading = false;
        this.uploadError = true;
        this.formError = error?.error?.message || 'An unexpected error occurred during upload.';
        console.error('Upload error:', error.status, error.message);
      }
    );
  }

  private resetStatus(): void {
    this.uploadProgress = 0;
    this.uploadSuccess = false;
    this.uploadError = false;
    this.formError = null;
  }
}
