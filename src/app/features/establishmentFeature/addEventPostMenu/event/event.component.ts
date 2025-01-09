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
    this.eventForm = this.fb.group(
      {
        image: [File, Validators.required],
        title: ['', Validators.required],
        body: ['', Validators.required],
        startDateOfEvent: ['', [Validators.required, this.futureDateValidator]],
        startTimeOfEvent: ['', Validators.required],
        endDateOfEvent: ['', [Validators.required, this.futureDateValidator]],
        endTimeOfEvent: ['', Validators.required],
        interests: ['', Validators.required],
        price: ['', Validators.required],
        location: ['', Validators.required],
        maxParticipants: ['', Validators.required],
        eventDuration: ['', Validators.required],
        eventCategory: ['', Validators.required],
      },
      { validators: this.endAfterStartValidator },
    );
  }

  getLocation() {
    this.estServ.estProfileState$.subscribe((estProfile) => {
      const location = estProfile?.locationInfo?.address || '';
      this.eventForm.patchValue({ location });
    });
  }

  endAfterStartValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDateOfEvent')?.value;
    const startTime = control.get('startTimeOfEvent')?.value;
    const endDate = control.get('endDateOfEvent')?.value;
    const endTime = control.get('endTimeOfEvent')?.value;

    if (!startDate || !startTime || !endDate || !endTime) {
      return null;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    return endDateTime >= startDateTime ? null : { endBeforeStart: true };
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
    const imageFile = formValue.image;

    if (formValue.image) {
      formData.append('image', imageFile);
    }
    formData.append('title', formValue.title);
    formData.append('body', formValue.body);
    formData.append('startDateOfEvent', formValue.startDateOfEvent);
    formData.append('startTimeOfEvent', formValue.startTimeOfEvent);
    formData.append('endTimeOfEvent', formValue.endTimeOfEvent);
    formData.append('endDateOfEvent', formValue.endDateOfEvent);
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

  get f() {
    return this.eventForm.controls;
  }
}
