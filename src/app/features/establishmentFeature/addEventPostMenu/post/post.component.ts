import { Component, OnInit } from '@angular/core';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ImageService } from '../../../../core/services/image/image.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  postForm!: FormGroup;
  postImg: any;

  constructor(
    private estServ: EstabilishmentService,
    private fb: FormBuilder,
    private imgServ: ImageService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.postForm = this.fb.group({
      image: [File, Validators.required],
      headline: ['', Validators.required],
      createAt: [new Date()],
      body: ['', Validators.required],
      likes: [0],
    });
  }

  uploadImg(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const validationErrors = this.imgServ.imageValidator(file);

      if (validationErrors) {
        this.postForm.get('image')?.setErrors(validationErrors);
        return;
      }

      this.postForm.patchValue({ image: file });
      this.postForm.get('image')?.setErrors(null);

      const previewReader = new FileReader();
      previewReader.onload = () => {
        this.postImg = previewReader.result as string;
      };
      previewReader.readAsDataURL(file);
    }
  }

  submitPost() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    const formValue = this.postForm.value;
    const imageFile = formValue.image;

    console.log(imageFile);

    formData.append('Picture', imageFile);
    formData.append('headline', formValue.headline);
    //  formData.append('createAt', formValue.createAt.toISOString());
    formData.append('body', formValue.body);
    //formData.append('likes', formValue.likes.toString());

    this.estServ.uploadPost(formData).subscribe();
  }

  cancelAddingPost() {
    this.estServ.addPost.set(false);
  }
}
