import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

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
  loading = true;
  noUsers = false;
  users: User[] = [];
  unsubscribe$ = new Subject();

  constructor(private stateService: StateService, usersService: UsersService) {
    usersService.fetchUsers();
  }

  ngOnInit(): void {
    this.stateService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: User[]) => {
        // TODO: clean this up?

        this.users = users;

        if (users.length) {
          this.noUsers = false;
          this.loading = false;
        } else {
          this.noUsers = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
