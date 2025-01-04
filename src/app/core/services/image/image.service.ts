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

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.sendToBackend(formData);
    }
  }

  imageValidator(
    file: File,
  ): { invalidFileType?: boolean; fileSizeExceeded?: boolean } | null {
    const errors: { [key: string]: boolean } = {};

    if (!this.validateFileType(file)) {
      errors['invalidFileType'] = true;
    }

    if (!this.validateFileSize(file)) {
      errors['fileSizeExceeded'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  }

  // Validate image size (max 5MB)
  validateFileSize(file: File): boolean {
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  sendToBackend(formData: FormData) {
    this.estServ.uploadImage(formData).subscribe();
  }
}
