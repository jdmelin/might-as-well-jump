import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';

@NgModule({
  declarations: [AddUserFormComponent, EditUserFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AddUserFormComponent, EditUserFormComponent],
})
export class ComponentsModule {}
