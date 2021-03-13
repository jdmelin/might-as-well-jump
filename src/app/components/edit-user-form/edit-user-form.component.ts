import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'edit-user-form',
  templateUrl: './edit-user-form.component.html',
})
export class EditUserFormComponent implements OnInit {
  @Input() user: any;
  isAttemptingDelete: boolean = false;
  form: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    const { firstName, lastName, username, email } = this.user;

    this.form = new FormGroup({
      firstname: new FormControl(firstName),
      lastname: new FormControl(lastName),
      username: new FormControl(username, Validators.required),
      email: new FormControl(email, Validators.required),
    });
  }

  onSubmit() {
    const user = this.form.value;
    Object.keys(user).forEach((k) => (user[k] = user[k].trim()));
    this.usersService.updateUser(user, this.user.id);
  }

  removeUser() {
    this.usersService.deleteUser(this.user.id);
  }

  toggleDeleteConfirmation() {
    this.isAttemptingDelete = !this.isAttemptingDelete;
  }
}
