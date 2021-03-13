import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { setSelectedUser } from '../actions/selectedUser.actions';

export const initialSelectedUser: User = {
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  username: '',
};

export const selectedUserReducer = createReducer(
  initialSelectedUser,
  on(setSelectedUser, (_, { selectedUser }) =>
    JSON.parse(JSON.stringify(selectedUser))
  )
);
