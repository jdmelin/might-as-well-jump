import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { setUsers } from '../actions/users.actions';

export const initialUsersState: User[] = [];

export const usersReducer = createReducer(
  initialUsersState,
  on(setUsers, (_, { users }) => [...users])
);
