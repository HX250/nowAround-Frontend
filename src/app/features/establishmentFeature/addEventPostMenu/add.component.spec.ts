import { TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let estServMock = {
    addEvent: jest.fn(),
    addPost: jest.fn(),
    addMenu: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(AddComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isEditing', () => {
    it('should return true if addMenu, addEvent or addPost is true', () => {
      estServMock.addMenu.mockReturnValue(true);
      expect(component.isEditing()).toBe(true);

      estServMock.addMenu.mockReturnValue(false);
      estServMock.addEvent.mockReturnValue(true);
      expect(component.isEditing()).toBe(true);

      estServMock.addEvent.mockReturnValue(false);
      estServMock.addPost.mockReturnValue(true);
      expect(component.isEditing()).toBe(true);
    });

    it('should return false if addMenu, addEvent and addPost are false', () => {
      estServMock.addMenu.mockReturnValue(false);
      estServMock.addEvent.mockReturnValue(false);
      estServMock.addPost.mockReturnValue(false);
      expect(component.isEditing()).toBe(false);
    });
  });
});
