import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { StateService } from 'src/app/services/state-service/state.service';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate(150)]),
    ]),
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  unsubscribe$ = new Subject();

  constructor(
    private stateService: StateService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.stateService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: User[]) => {
        // if there are no users,fetch the them; otherwise, set the users to the users in state
        if (!users.length) {
          this.usersService.fetchUsers();
        } else {
          this.users = users;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
