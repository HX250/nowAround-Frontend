import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Menu } from '../../models/profile/menu.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Output() updatedMenuItems = new EventEmitter();
  menuForm!: FormGroup;
  @Input() oldMenu?: Menu;

  constructor(
    private estServ: EstabilishmentService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    if (this.oldMenu) {
      this.menuForm = this.fb.group({
        name: [this.oldMenu.name, Validators.required],
        menuItems: this.fb.array(
          this.oldMenu.menuItems.map((item) =>
            this.fb.group({
              id: [item.id],
              name: [item.name, Validators.required],
              description: [item.description, Validators.required],
              price: [item.price, [Validators.required]],
            }),
          ),
        ),
      });
    } else {
      this.menuForm = this.fb.group({
        name: ['', Validators.required],
        menuItems: this.fb.array([]),
      });
    }
  }

  submitNewMenuCategory() {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    const newCategory: Menu = {
      id: this.oldMenu?.id || '',
      name: this.menuForm.value.name,
      menuItems: this.menuItems.value,
    };
    this.updatedMenu(newCategory);
  }

  updatedMenu(menu: Menu) {
    this.updatedMenuItems.emit();
    if (this.oldMenu) {
      this.estServ.updateMenuItems(menu).subscribe();
      this.estServ.addMenu.set(false);
    } else {
      this.menuItems.clear();
      this.menuForm.reset();
      this.estServ.addNewMenu(menu).subscribe();
      this.estServ.addMenu.set(false);
    }
  }

  cancelAddMenuCategory() {
    this.estServ.addMenu.set(false);
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
