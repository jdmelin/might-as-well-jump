import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate(150)]),
    ]),
  ],
})
export class AddUserComponent {}
