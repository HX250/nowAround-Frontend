import {
  Component,
  computed,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Menu } from '../../models/profile/menu.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Output() updatedMenuItems = new EventEmitter();
  newMenuCategory?: Menu[] = [];
  menuForm!: FormGroup;
  isAddingMenuCategory = computed(() =>
    this.estServ.editMenu() ? true : false,
  );

  constructor(
    private estServ: EstabilishmentService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      menuItems: this.fb.array([]),
    });
  }

  submitNewMenuCategory() {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    const newCategory: Menu = {
      name: this.menuForm.value.name,
      menuItems: this.menuItems.value,
    };
    if (this.newMenuCategory) {
      this.newMenuCategory.push(newCategory);
    }
    this.updatedMenu();
  }

  updatedMenu() {
    this.updatedMenuItems.emit();
    this.menuItems.clear();
    this.menuForm.reset();
    this.estServ.addNewMenu(this.newMenuCategory).subscribe((Response) => {
      this.newMenuCategory = [];
    });
  }

  cancelAddMenuCategory() {
    this.estServ.editMenu.set(false);
  }

  addMenuItem() {
    const menuItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
    });
    this.menuItems.push(menuItemForm);
  }

  removeMenuItem(index: number) {
    this.menuItems.removeAt(index);
  }

  get menuItems() {
    return this.menuForm.get('menuItems') as FormArray;
  }
}
