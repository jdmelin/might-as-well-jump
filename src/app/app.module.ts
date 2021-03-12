import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    LayoutsModule,
    ViewsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
