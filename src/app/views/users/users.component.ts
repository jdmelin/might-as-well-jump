import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .fetchUsers()
      .pipe(take(1))
      .subscribe((res) => {
        this.users = res.results;
      });

    // this.usersService.fetchUsers();
    // this.stateService.getUsers().subscribe((users: Users) => this.users = users)
  }
}
