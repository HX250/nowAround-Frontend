import { Injectable } from '@angular/core';
import { EstabilishmentService } from '../establishment/establishment.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private estServ: EstabilishmentService) {}

  onFileChange(event: any, where: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG and PNG formats are allowed.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must not exceed 5MB.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('location', where);

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.sendToBackend(formData);
    }
  }

  sendToBackend(formData: FormData) {
    this.estServ.uploadImage(formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        alert('Image uploaded successfully!');
      },
      error: (error) => {
        console.error('Upload failed:', error);
        alert('Failed to upload the image. Please try again.');
      },
    });
  }
}
