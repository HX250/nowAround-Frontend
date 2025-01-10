import { Component, OnInit } from '@angular/core';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
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
      startDateOfEvent: ['', [Validators.required, this.futureDateValidator]],
      startTimeOfEvent: ['', Validators.required],
      endDateOfEvent: ['', [Validators.required, this.futureDateValidator]],
      endTimeOfEvent: ['', Validators.required],
      city: ['', Validators.required],
      price: [null, Validators.required],
      location: ['', Validators.required],
      maxParticipants: ['', Validators.required],
      eventCategory: ['', Validators.required],
    });
  }

  getLocation() {
    this.estServ.estProfileState$.subscribe((estProfile) => {
      const location = estProfile?.locationInfo.address || '';
      const city = estProfile?.locationInfo.city;
      this.eventForm.patchValue({
        location,
      });
      this.eventForm.patchValue({ city });
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const currentDate = new Date().toISOString().split('T')[0];
    const inputDate = new Date(control.value).toISOString().split('T')[0];
    return inputDate >= currentDate ? null : { pastDate: true };
  }

  uploadImg(event: any) {
    const file = event.target.files[0];

    const validationErrors = this.imgServ.imageValidator(file);

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
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.eventForm.value;

    if (formValue.image) {
      formData.append('picture', formValue.image);
    }
    formData.append('title', formValue.title);
    formData.append('body', formValue.body);
    formData.append(
      'start',
      formValue.startDateOfEvent + 'T' + formValue.startTimeOfEvent,
    );
    formData.append(
      'end',
      formValue.endDateOfEvent + 'T' + formValue.endTimeOfEvent,
    );
    formData.append('city', formValue.city);
    formData.append('price', formValue.price.toString());
    formData.append('address', formValue.location);
    formData.append('maxParticipants', formValue.maxParticipants.toString());
    formData.append('eventCategory', formValue.eventCategory);

    this.estServ.uploadEvent(formData).subscribe();
  }

  cancelAddingEvent() {
    this.estServ.addEvent.set(false);
  }

  get f() {
    return this.eventForm.controls;
  }
}
