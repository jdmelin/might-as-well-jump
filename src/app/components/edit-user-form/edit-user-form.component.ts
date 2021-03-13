import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'edit-user-form',
  templateUrl: './edit-user-form.component.html',
})
export class EditUserFormComponent implements OnInit {
  @Input() user: any;
  form: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    const { firstName, lastName, username, email } = this.user;

    this.form = new FormGroup({
      firstname: new FormControl(firstName, Validators.required),
      lastname: new FormControl(lastName, Validators.required),
      username: new FormControl(username, Validators.required),
      email: new FormControl(email, Validators.required),
    });
  }

  onSubmit() {
    const user = this.form.value;
    this.usersService.updateUser(user, this.user.id);
  }
}
