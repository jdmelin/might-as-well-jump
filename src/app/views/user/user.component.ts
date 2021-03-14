import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { StateService } from 'src/app/services/state-service/state.service';
import { UsersService } from 'src/app/services/users-service/users.service';
import { initialSelectedUser } from 'src/app/store/reducers/selectedUser.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate(150)]),
    ]),
  ],
})
export class UserComponent implements OnInit, OnDestroy {
  user: User = initialSelectedUser;
  unsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.stateService
      .getSelectedUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        // if there's no selectedUser or the current selectedUser id does not match the route id, fetch the correct user;
        //   otherwise, set the user to the current selectedUser in state
        if (!user.id || user.id !== id) {
          this.usersService.fetchUserById(id);
        } else {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
