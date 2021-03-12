import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectoryComponent } from './directory/directory.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [DirectoryComponent, NavComponent],
  imports: [CommonModule],
  exports: [DirectoryComponent, NavComponent],
})
export class LayoutsModule {}
