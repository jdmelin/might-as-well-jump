import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.component.html',
})
export class AddUserFormComponent implements OnInit {
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onSubmit() {
    const user = this.form.value;
    this.usersService.createUser(user);
  }
}
