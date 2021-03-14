import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
})
export class AddUserFormComponent {
  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  constructor(private usersService: UsersService) {}

  onSubmit(): void {
    const user = this.form.value;
    Object.keys(user).forEach((k) => (user[k] = user[k].trim()));
    this.usersService.createUser(user);
  }
}
