import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { setSelectedUser } from '../../store/actions/selectedUser.actions';
import { setUsers } from '../../store/actions/users.actions';
import { AppState } from '../../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private store: Store<AppState>) {}

  getSelectedUser(): Observable<any> {
    return this.store.pipe(select('selectedUser'));
  }

  getUsers(): Observable<any> {
    return this.store.pipe(select('users'));
  }

  setSelectedUser(selectedUser: User): void {
    this.store.dispatch(setSelectedUser({ selectedUser }));
  }

  setUsers(users: User[]): void {
    this.store.dispatch(setUsers({ users }));
  }
}
