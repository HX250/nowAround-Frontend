import { Component, OnInit } from '@angular/core';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  EventCategory,
  maxParticipants,
} from '../../models/profile/events.model';
import { ImageService } from '../../../../core/services/image/image.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  eventImg: any;
  eventForm!: FormGroup;
  eventCategories = Object.values(EventCategory);
  maxParticipants = Object.values(maxParticipants);

  constructor(
    private estServ: EstabilishmentService,
    private fb: FormBuilder,
    private imgServ: ImageService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getLocation();
  }

  buildForm() {
    this.eventForm = this.fb.group({
      image: [File],
      title: ['', Validators.required],
      body: ['', Validators.required],
      dateOfEvent: [new Date()],
      timeOfEvent: [],
      interests: ['', Validators.required],
      price: [0, Validators.required],
      location: ['', Validators.required],
      maxParticipants: [0, Validators.required],
      eventDuration: [0, Validators.required],
      eventCategory: ['', Validators.required],
    });
  }

  getLocation() {
    this.estServ.estProfileState$.subscribe((estProfile) => {
      const location = estProfile?.locationInfo?.address || '';
      this.eventForm.patchValue({ location });
    });
  }

  uploadImg(event: any) {
    const file = event.target.files[0];

    const validationErrors = this.imgServ.imageValidator(file);
    console.log(validationErrors);

    if (validationErrors) {
      this.eventForm.get('image')?.setErrors(validationErrors);
      return;
    }

    this.eventForm.patchValue({ image: file });

    const previewReader = new FileReader();
    previewReader.onload = () => {
      this.eventImg = previewReader.result as string;
    };
    previewReader.readAsDataURL(file);
  }

  submitPost() {
    const formData = new FormData();

    const formValue = this.eventForm.value;
    const imageFile = formValue.image;

    if (formValue.image) {
      formData.append('image', imageFile);
    }

    formData.append('title', formValue.title);
    formData.append('body', formValue.body);
    formData.append('dateOfEvent', formValue.dateOfEvent);
    formData.append('interests', formValue.interests);
    formData.append('price', formValue.price.toString());
    formData.append('location', formValue.location);
    formData.append('maxParticipants', formValue.maxParticipants.toString());
    formData.append('eventDuration', formValue.eventDuration.toString());
    formData.append('eventCategory', formValue.eventCategory);

    console.log(this.eventForm.value);
    this.estServ.uploadEvent(formData).subscribe();
  }

  cancelAddingEvent() {
    this.estServ.addEvent.set(false);
  }
}
