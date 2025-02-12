import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { EstabilishmentService } from '../establishment/establishment.service';
import { AlertService } from '../alert/alert.service';
import { of } from 'rxjs';

describe('ImageService', () => {
  let service: ImageService;
  const mockEstabilishmentService = {
    uploadImage: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageService,
        { provide: EstabilishmentService, useValue: mockEstabilishmentService },
        { provide: AlertService, useValue: { showAlert: jest.fn() } },
      ],
    });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
