import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutsModule } from '../layouts/layouts.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [HomeComponent, UserComponent, UsersComponent],
  imports: [CommonModule, LayoutsModule],
})
export class ViewsModule {}
