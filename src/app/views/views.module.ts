import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    UsersComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ComponentsModule,
    LayoutsModule,
    RouterModule,
  ],
})
export class ViewsModule {}
