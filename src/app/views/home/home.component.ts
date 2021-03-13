import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate(150)]),
    ]),
  ],
})
export class HomeComponent {}
