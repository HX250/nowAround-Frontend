import { Injectable } from '@angular/core';
import { EstabilishmentService } from '../establishment/establishment.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private estServ: EstabilishmentService,
    private alertService: AlertService,
  ) {}

  onFileChange(event: any, where?: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.alertService.showAlert(
          'establishmentAddPostError-imgFileType',
          false,
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.alertService.showAlert(
          'establishmentAddPostError-imgFileSize',
          false,
        );
        return;
      }

      const formData = new FormData();
      formData.append('picture', file);

      this.sendToBackend(formData, where);
    }
  }

  imageValidator(file: File): {
    invalidFileType?: boolean;
    fileSizeExceeded?: boolean;
    required?: boolean;
  } | null {
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

  validateFileSize(file: File): boolean {
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  addAccordingPhoto(where: string): string {
    switch (where) {
      case 'estProfilePicture':
        return 'establishment/placeholders/image.png';
      case 'estCoverPicture':
        return 'establishment/placeholders/image.png';
      case 'post':
        return 'establishment/placeholders/post.png';
      case 'menuItem':
        return 'establishment/placeholders/menuItem.png';
      case 'event':
        return 'establishment/placeholders/event.png';
      default:
        return 'establishment/placeholders/image.png';
    }
  }

  sendToBackend(formData: FormData, where?: string) {
    this.estServ.uploadImage(formData, where).subscribe();
  }
}
