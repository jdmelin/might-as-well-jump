import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';
import { initialSelectedUser } from 'src/app/store/reducers/selectedUser.reducer';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate(150)]),
    ]),
  ],
})
export class UserComponent implements OnDestroy {
  user: User = initialSelectedUser;
  unsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';

    // if hitting route directly (no users in the state array), fetch user
    this.stateService.getUsers().subscribe((users: User[]) => {
      if (!users.length) {
        this.usersService.fetchUserById(id);
      }
    });

    this.stateService
      .getSelectedUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        // if there's no selectedUser or the current selectedUser id does not match the route id, fetch the correct user;
        //   otherwise, set the user to the current selectedUser in the store
        if (!user.id || user.id !== id) {
          this.usersService.fetchUserById(id);
        } else {
          this.user = user;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
